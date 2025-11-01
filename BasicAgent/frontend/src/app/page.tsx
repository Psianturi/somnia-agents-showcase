'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AgentStatus from '@/components/AgentStatus';
import TriggerActionForm from '@/components/TriggerActionForm';
import ActionHistory from '@/components/ActionHistory';

// Type declaration for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Get configuration from environment variables
const AGENT_ADDRESS = process.env.NEXT_PUBLIC_AGENT_ADDRESS || '0x12BF7CF7361653d63C1872Ae0F9636Ba80447fA5';
const RPC_URL = process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || 'https://dream-rpc.somnia.network';
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || '50312');
const CHAIN_ID_HEX = process.env.NEXT_PUBLIC_CHAIN_ID_HEX || '0xC488';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  // Add Somnia Network to MetaMask
  const addSomniaNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: CHAIN_ID_HEX,
          chainName: 'Somnia Testnet',
          nativeCurrency: {
            name: 'STT',
            symbol: 'STT',
            decimals: 18
          },
          rpcUrls: [RPC_URL],
          blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER || 'https://explorer.somnia.network']
        }]
      });
      return true;
    } catch (error) {
      console.error('Failed to add Somnia network:', error);
      return false;
    }
  };

  // Switch to Somnia Network
  const switchToSomnia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_HEX }]
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added yet, try to add it
        return await addSomniaNetwork();
      }
      console.error('Failed to switch network:', error);
      return false;
    }
  };

  // Connect Wallet
  const connectWallet = async () => {
    try {
      console.log('🔗 Connect Wallet clicked');
      
      if (!window.ethereum) {
        alert('❌ MetaMask not detected.\n\nPlease:\n1. Install MetaMask extension\n2. Refresh the page\n3. Try again');
        return;
      }

      console.log('📱 Requesting accounts from MetaMask...');
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('✓ Accounts received:', accounts);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      console.log('✓ Network info:', { chainId: network.chainId, name: network.name });

      // Check if on Somnia testnet
      if (network.chainId !== BigInt(CHAIN_ID)) {
        console.warn(`⚠️ Wrong network detected. Current: ${network.chainId}, Expected: ${CHAIN_ID}`);
        
        const shouldSwitch = confirm(`⚠️ Wrong Network!\n\nCurrent: ${network.name} (${network.chainId})\nRequired: Somnia Testnet (${CHAIN_ID})\n\nWould you like to switch automatically?`);
        
        if (shouldSwitch) {
          const switched = await switchToSomnia();
          if (!switched) {
            alert('❌ Failed to switch network. Please switch manually to Somnia Testnet.');
            return;
          }
          // Retry connection after network switch
          setTimeout(() => connectWallet(), 1000);
          return;
        } else {
          alert('Please switch to Somnia Testnet manually and try again.');
          return;
        }
      }

      console.log('✓ Correct network confirmed');
      setWalletAddress(accounts[0]);
      setWalletConnected(true);

      // Check if wallet is owner
      await checkOwner(accounts[0]);
      await loadAgentStatus();
      await loadEvents();
      
      console.log('✓ Wallet connected successfully:', accounts[0]);
    } catch (error: any) {
      console.error('❌ Wallet connection failed:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      if (error.code === 4001) {
        alert('⚠️ Connection rejected by user');
      } else if (error.code === -32603) {
        alert('❌ MetaMask error - please check your setup');
      } else {
        alert(`❌ Connection failed:\n${error.message || 'Unknown error'}`);
      }
    }
  };

  // Disconnect Wallet
  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setIsOwner(false);
    setAgentStatus(null);
    setEvents([]);
  };

  // Check if wallet is owner
  const checkOwner = async (address: string) => {
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const response = await fetch('/api/agent/check-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: AGENT_ADDRESS,
          walletAddress: address,
        }),
      });

      const data = await response.json();
      setIsOwner(data.isOwner);
    } catch (error) {
      console.error('Failed to check owner:', error);
    }
  };

  // Load Agent Status
  const loadAgentStatus = async () => {
    try {
      const response = await fetch(
        `/api/agent/status?address=${AGENT_ADDRESS}`
      );
      const data = await response.json();
      setAgentStatus(data);
    } catch (error) {
      console.error('Failed to load agent status:', error);
    }
  };

  // Load Events
  const loadEvents = async () => {
    try {
      const response = await fetch(
        `/api/agent/events?address=${AGENT_ADDRESS}&limit=10`
      );
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  // Trigger Action
  const handleTriggerAction = async (actionData: string) => {
    if (!walletConnected || !isOwner) {
      alert('Only owner can trigger actions');
      return;
    }

    setLoading(true);
    try {
      // Get signer and contract instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const AGENT_ABI = [
        'function triggerAgentAction(string data) public',
      ];

      const contract = new ethers.Contract(AGENT_ADDRESS, AGENT_ABI, signer);

      // Send transaction
      const tx = await contract.triggerAgentAction(actionData);
      const receipt = await tx.wait();

      if (receipt && receipt.hash) {
        alert(`✅ Action triggered!\nTxHash: ${receipt.hash}`);
        // Refresh status and events after 2 seconds
        setTimeout(() => {
          loadAgentStatus();
          loadEvents();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Trigger action failed:', error);
      if (error.reason === 'rejected') {
        alert('Transaction rejected by user');
      } else {
        alert(`Failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full">
              <span className="text-sm font-semibold text-indigo-300">⚙️ Autonomous Agent System</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            🤖 BasicAgent
          </h1>
          <p className="text-xl text-slate-300">
            Intelligent Agent Control Panel powered by Somnia Blockchain
          </p>
        </div>

        {/* Network Status Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-slate-400 text-sm">Network:</span>
              <span className="text-green-400 font-semibold">Somnia Testnet (50312)</span>
            </div>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-10">
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 text-lg"
            >
              <span>🔗</span> Connect Wallet
            </button>
          ) : (
            <div className="flex gap-4 items-center bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 rounded-xl border border-slate-600/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-slate-300 font-medium">Connected:</span>
              </div>
              <span className="text-indigo-300 font-mono text-sm font-semibold">{walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}</span>
              {isOwner && (
                <span className="ml-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 text-amber-300 text-sm font-bold rounded-full">
                  👑 Owner
                </span>
              )}
              <button
                onClick={disconnectWallet}
                className="ml-4 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors border border-red-600/30"
              >
                ✕ Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {walletConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Status & Trigger */}
            <div className="lg:col-span-2 space-y-8">
              {/* Agent Status */}
              <AgentStatus status={agentStatus} agentAddress={AGENT_ADDRESS} />

              {/* Trigger Action Form */}
              {isOwner ? (
                <TriggerActionForm
                  onTrigger={handleTriggerAction}
                  loading={loading}
                />
              ) : (
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-l-4 border-amber-500 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-amber-300 font-semibold">Not Authorized</p>
                      <p className="text-amber-200 text-sm mt-1">
                        Only the contract owner can trigger actions on this agent.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - History */}
            <div>
              <ActionHistory events={events} onRefresh={loadEvents} />
            </div>
          </div>
        ) : (
          <div className="text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-16 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-4xl mb-4">🔐</p>
            <p className="text-slate-300 text-xl mb-2 font-semibold">
              Connect Your Wallet to Get Started
            </p>
            <p className="text-slate-400 mb-6">
              Use MetaMask or any Web3 wallet to interact with the BasicAgent
            </p>
            <p className="text-slate-500 text-sm">
              Make sure you're on Somnia Testnet (Chain ID: 50312)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

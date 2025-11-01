import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

const RPC_URL = 'https://dream-rpc.somnia.network';
const AGENT_ABI = [
  'function triggerAgentAction(string data) public',
];

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, actionData, walletAddress, signature } = await request.json();

    // Validate inputs
    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      return NextResponse.json(
        { error: 'Invalid contract address' },
        { status: 400 }
      );
    }

    if (!actionData || typeof actionData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid action data' },
        { status: 400 }
      );
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Note: In a real application, you would verify the signature here
    // For now, we're assuming the frontend has already done wallet verification

    // This endpoint is for reference - actual transaction signing should happen on frontend
    // because private keys should never be transmitted to the backend

    return NextResponse.json({
      success: true,
      message: 'Transaction should be signed and sent from frontend',
      note: 'Use ethers.js on frontend to sign and send transactions',
    });
  } catch (error: any) {
    console.error('Error triggering action:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to trigger action' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

const RPC_URL = 'https://dream-rpc.somnia.network';
const AGENT_ABI = [
  'function owner() public view returns (address)',
];

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, walletAddress } = await request.json();

    if (!contractAddress || !ethers.isAddress(contractAddress)) {
      return NextResponse.json(
        { error: 'Invalid contract address' },
        { status: 400 }
      );
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(contractAddress, AGENT_ABI, provider);

    const owner = await contract.owner();
    const isOwner = owner.toLowerCase() === walletAddress.toLowerCase();

    return NextResponse.json({
      success: true,
      isOwner,
      owner,
      walletAddress,
    });
  } catch (error: any) {
    console.error('Error checking owner:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check owner' },
      { status: 500 }
    );
  }
}
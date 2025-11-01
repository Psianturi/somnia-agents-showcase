import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

const RPC_URL = 'https://dream-rpc.somnia.network';
const AGENT_ABI = [
  'function getAgentStatus() public view returns (uint256, string memory)',
  'function owner() public view returns (address)',
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('address');

    if (!address || !ethers.isAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid contract address' },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(address, AGENT_ABI, provider);

    // Get agent status
    const [timestamp, data] = await contract.getAgentStatus();
    const owner = await contract.owner();

    return NextResponse.json({
      success: true,
      timestamp: Number(timestamp),
      lastActionData: data,
      owner: owner,
      contractAddress: address,
    });
  } catch (error: any) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch status' },
      { status: 500 }
    );
  }
}
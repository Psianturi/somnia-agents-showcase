import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

const RPC_URL = 'https://dream-rpc.somnia.network';
const AGENT_ABI = [
  'event AgentActionTriggered(string data, uint256 timestamp)',
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('address');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (!address || !ethers.isAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid contract address' },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(address, AGENT_ABI, provider);

    // Get latest block
    const latestBlock = await provider.getBlockNumber();
    const startBlock = Math.max(0, latestBlock - 5000); // Look back 5000 blocks

    // Query events
    const filter = contract.filters.AgentActionTriggered();
    const events = await contract.queryFilter(filter, startBlock, latestBlock);

    // Sort by newest first and paginate
    const sortedEvents = events
      .reverse()
      .slice(offset, offset + limit)
      .map((event: any) => ({
        data: event.args[0],
        timestamp: Number(event.args[1]),
        txHash: event.transactionHash,
        blockNumber: event.blockNumber,
      }));

    return NextResponse.json({
      success: true,
      events: sortedEvents,
      total: events.length,
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

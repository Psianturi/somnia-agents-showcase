'use client';

export default function AgentStatus({ status, agentAddress }: any) {
  if (!status) {
    return (
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/20 animate-pulse">
        <div className="h-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded w-full"></div>
          <div className="h-5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded w-5/6"></div>
          <div className="h-5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    alert('Address copied!');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/40 rounded-xl p-8 border border-indigo-500/30 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-4xl">📊</span> Agent Status
        </h2>
        <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
          <p className="text-sm font-semibold text-green-400">● Active</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Contract Address */}
        <div className="group bg-slate-800/50 hover:bg-slate-800/70 p-5 rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
             onClick={() => handleCopyAddress(agentAddress)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Contract Address</p>
          <p className="text-white font-mono text-sm break-all group-hover:text-indigo-300 transition-colors">
            {agentAddress}
          </p>
          <p className="text-xs text-slate-500 mt-2">🔗 Click to copy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Owner */}
          <div className="bg-slate-800/50 hover:bg-slate-800/70 p-5 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
               onClick={() => handleCopyAddress(status.owner)}
               style={{ cursor: 'pointer' }}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Owner Address</p>
            <p className="text-white font-mono text-xs break-all hover:text-purple-300 transition-colors">
              {status.owner?.slice(0, 10)}...{status.owner?.slice(-8)}
            </p>
          </div>

          {/* Last Action */}
          <div className="bg-slate-800/50 hover:bg-slate-800/70 p-5 rounded-lg border border-slate-700/50 hover:border-pink-500/30 transition-all duration-300">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Last Action Data</p>
            <p className="text-white font-semibold text-sm break-words min-h-6">
              {status.lastActionData || <span className="text-slate-500 italic">No actions yet</span>}
            </p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-5 rounded-lg border border-indigo-500/30">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Last Action Timestamp</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <p className="text-white font-semibold">
              {status.lastActionTimestamp
                ? formatTime(status.lastActionTimestamp)
                : <span className="text-slate-500 italic">No actions yet</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

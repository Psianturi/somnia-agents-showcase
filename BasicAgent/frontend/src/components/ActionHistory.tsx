'use client';

export default function ActionHistory({ events, onRefresh }: any) {
  const TX_EXPLORER = process.env.NEXT_PUBLIC_TX_EXPLORER || 'https://somnia-testnet.blockscout.com';
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('id-ID', {
      dateStyle: 'short',
      timeStyle: 'medium'
    });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-slate-900/40 rounded-xl p-8 border border-cyan-500/30 shadow-xl h-fit sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-3xl">📜</span> History
        </h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-300 text-sm rounded-lg transition-all duration-300 flex items-center gap-1"
        >
          <span className="animate-spin">🔄</span> Refresh
        </button>
      </div>

      {events && events.length > 0 ? (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {events.map((event: any, idx: number) => (
            <div
              key={idx}
              className="group bg-slate-800/50 hover:bg-slate-800/70 p-4 rounded-lg border-l-4 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                    #{idx + 1}
                  </span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-400">
                    {formatTime(event.timestamp)}
                  </span>
                </div>
                {event.txHash && (
                  <a
                    href={`${TX_EXPLORER}/tx/${event.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-mono font-semibold transition-colors"
                  >
                    View Tx ↗
                  </a>
                )}
              </div>
              <p className="text-white text-sm break-words font-medium group-hover:text-cyan-100 transition-colors">
                {event.data}
              </p>
              <div className="flex gap-2 mt-2 text-xs text-slate-500">
                <span>Block: {event.blockNumber}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 p-8 rounded-lg text-center border border-slate-700/50">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-slate-400 font-medium">No actions yet</p>
          <p className="text-slate-500 text-sm mt-1">Trigger an action to see it here</p>
        </div>
      )}

      {/* Scrollbar styling hint */}
      <style>{`
        div::-webkit-scrollbar { width: 6px; }
        div::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 10px; }
        div::-webkit-scrollbar-thumb { background: rgba(34, 197, 238, 0.4); border-radius: 10px; }
        div::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 238, 0.6); }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function TriggerActionForm({ onTrigger, loading }: any) {
  const [actionType, setActionType] = useState('check-balance');
  const [data, setData] = useState('');

  const actions = [
    { value: 'check-balance', label: '💰 Check Balance', placeholder: '0x1234... or wallet' },
    { value: 'transfer', label: '↔️ Transfer Funds', placeholder: 'recipient:amount' },
    { value: 'stake', label: '📌 Stake Tokens', placeholder: 'amount' },
    { value: 'custom', label: '⚙️ Custom Action', placeholder: 'custom data' },
  ];

  const currentAction = actions.find(a => a.value === actionType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.trim()) {
      alert('⚠️ Please enter action data');
      return;
    }
    onTrigger(`${actionType}:${data}`);
    setData('');
  };

  return (
    <div className="bg-gradient-to-br from-orange-900/40 via-red-900/30 to-slate-900/40 rounded-xl p-8 border border-orange-500/30 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">⚡</span>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
          Trigger Agent Action
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Action Type Selector */}
        <div>
          <label className="block text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            Select Action
          </label>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <button
                key={action.value}
                type="button"
                onClick={() => setActionType(action.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 font-medium text-sm ${
                  actionType === action.value
                    ? 'bg-orange-600/40 border-orange-400/60 text-orange-300 shadow-lg'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600/50'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Data Input */}
        <div>
          <label className="block text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            Action Data
          </label>
          <div className="relative">
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={currentAction?.placeholder || 'Enter action data'}
              rows={2}
              className="w-full bg-slate-900/60 text-white border border-slate-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-500/20 font-mono text-sm placeholder-slate-500 transition-all duration-300"
            />
            <div className="absolute -bottom-6 left-0 text-xs text-slate-400">
              {data.length} / 500 chars
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-6 flex items-center gap-1">
            <span>�</span> {
              actionType === 'check-balance' ? 'Enter wallet or contract address' :
              actionType === 'transfer' ? 'Format: recipient_address:amount' :
              actionType === 'stake' ? 'Enter amount to stake' :
              'Enter any custom data'
            }
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
            loading
              ? 'bg-slate-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Processing...
            </>
          ) : (
            <>
              <span>🚀</span>
              Trigger Action
            </>
          )}
        </button>
      </form>
    </div>
  );
}

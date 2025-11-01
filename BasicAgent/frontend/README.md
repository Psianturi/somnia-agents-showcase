# BasicAgent Frontend Dashboard

Interactive NextJS dashboard untuk mengontrol BasicAgent di Somnia Testnet.

## 🚀 Quick Start

```bash
cd BasicAgent/frontend
npm install
npm run dev
```

Akses: http://localhost:3000

## 📋 Features

- ✅ MetaMask wallet connection
- ✅ View agent status (owner, last action)
- ✅ Trigger agent actions
- ✅ View action history
- ✅ Owner verification

## ⚙️ Configuration

| Setting | Value |
|---------|-------|
| **Network** | Somnia Testnet |
| **Chain ID** | 50312 |
| **RPC** | https://dream-rpc.somnia.network |
| **Agent Address** | 0x12BF7CF7361653d63C1872Ae0F9636Ba80447fA5 |

## 🏗️ Stack

- **Framework:** Next.js 15.0 + React 19.0
- **Blockchain:** ethers.js 6.11
- **Styling:** Tailwind CSS 3.3
- **Language:** TypeScript 5.3

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx (main dashboard)
│   ├── globals.css
│   └── api/agent/
│       ├── status/route.ts
│       ├── check-owner/route.ts
│       ├── events/route.ts
│       └── trigger/route.ts
└── components/
    ├── AgentStatus.tsx
    ├── TriggerActionForm.tsx
    └── ActionHistory.tsx
```

## 🔧 Setup MetaMask

1. Install MetaMask extension
2. Add Somnia Testnet:
   - Chain ID: `50312`
   - RPC: `https://dream-rpc.somnia.network`
   - Currency: `SOMNIA`
3. Import account dengan test tokens

## 📝 Action Format

Format: `actionType:data`

Contoh:
- `check-balance:0x...` - Check balance
- `transfer:recipient` - Transfer funds
- `deploy:contractCode` - Deploy contract

## ⚡ Known Issues

- Event fetching limited to last 1000 blocks (RPC limit)
- Use smaller block range for better performance

## 📦 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Run production
npm run lint     # Run linter
```

# Somnia AI Agents Showcase

[![Somnia Network](https://img.shields.io/badge/Built%20on-Somnia%20Network-blue)](https://somnia.network/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Live demonstration projects showcasing various types of autonomous AI agents built on the Somnia blockchain.

## 🎯 Demo Projects

### 1. **BasicAgent** - Simple Autonomous Agent  
- ✅ Basic trigger functionality
- ✅ Owner access control
- ✅ Event logging
- ✅ Real-time status monitoring
- ✅ Interactive Next.js dashboard

### 2. **CustomAgent** - Customizable Agent Template
- ✅ Flexible configuration
- ✅ Custom action handling
- ✅ Owner controls
- ✅ Production-ready contract

### 3. **DefiAgent** - Advanced DeFi Price Monitoring
- ✅ Price monitoring & thresholds
- ✅ Trading signal generation
- ✅ Multi-token support
- ✅ Automated triggers

### 4. **NftAgent** - NFT Management Agent
- ✅ NFT collection monitoring
- ✅ Automated actions
- ✅ Owner controls
- ✅ Event tracking

### 5. **YieldAgent** - Yield Farming Automation
- ✅ Yield monitoring
- ✅ Automated yield claiming
- ✅ Liquidity management
- ✅ Threshold-based triggers

### 6. **NewWizardAgent** - Advanced Custom Agent
- ✅ Complex automation logic
- ✅ Multi-step workflows
- ✅ Dynamic configuration
- ✅ Full event logging

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash && foundryup`)

### Deploy Any Agent Locally

```bash
# Clone this repository
git clone https://github.com/Psianturi/somnia-agents-showcase.git
cd somnia-agents-showcase

# Choose any demo project
cd BasicAgent  # or CustomAgent, DefiAgent, NftAgent, YieldAgent, NewWizardAgent

# Install dependencies
forge install foundry-rs/forge-std

# Run tests
forge test

# Expected output: All tests pass ✅
```

### Deploy to Somnia Testnet

```bash
# 1. Set up your environment (see Configuration section)
# 2. Deploy from the agent directory
cd DemoBasicAgent
forge script script/Deploy.s.sol --rpc-url $SOMNIA_RPC_URL --broadcast

# 3. Check deployment
cat .deployment.json
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Somnia RPC Configuration
SOMNIA_RPC_URL=https://dream-rpc.somnia.network

# Private Key (for deployment only - NEVER commit to git)
PRIVATE_KEY=your_private_key_here_do_not_commit

# BasicAgent Frontend Configuration
NEXT_PUBLIC_AGENT_ADDRESS=0x12BF7CF7361653d63C1872Ae0F9636Ba80447fA5
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_CHAIN_ID_HEX=0xC488
NEXT_PUBLIC_SOMNIA_RPC_URL=https://dream-rpc.somnia.network
NEXT_PUBLIC_BLOCK_EXPLORER=https://explorer.somnia.network
NEXT_PUBLIC_TX_EXPLORER=https://somnia-testnet.blockscout.com
```

**⚠️ Security Warning:**
- **NEVER** commit `.env` to Git
- Use `.env.example` as template (without real keys)
- Only store `PRIVATE_KEY` in secure `.env` file
- Never share your private key with anyone

## 📋 Deployment Status

**Successfully deployed to Somnia Testnet (Chain ID: 50312):**

| Agent | Address | Status |
|-------|---------|--------|
| BasicAgent | `0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4` | ✅ Verified |
| CustomAgent | `0x[address]` | ✅ Deployed |
| DefiAgent | `0x43B07bf47a4054eA0fd67Aaa191A6A651d81C1c7` | ✅ Verified |
| NftAgent | `0xE454c9d2bA1b79Fa7E6dE5Cd9E267c71E58F12Ec` | ✅ Verified |
| YieldAgent | `0x9Cfb5C822D80FCB714a707bD0916237277531FcE` | ✅ Verified |
| NewWizardAgent | `0x2F65CAFF6eA3bE96E13244F4Bc6530B734A33427` | ✅ Verified |

Check each agent's `.deployment.json` file for exact deployment details (txHash, block number, timestamp).

## 📊 Network Configuration

**Somnia Testnet:**
- **RPC URL:** `https://dream-rpc.somnia.network`
- **Chain ID:** `50312`
- **Symbol:** `STT`
- **Block Explorer:** `https://explorer.somnia.network`
- **TX Explorer:** `https://somnia-testnet.blockscout.com`

## 🛠️ Tech Stack

- **Smart Contracts:** Solidity 0.8.x
- **Development:** Foundry (Forge & Cast)
- **Frontend:** Next.js 15.0 + React 19.0 + TypeScript
- **Blockchain Interaction:** ethers.js 6.11
- **Styling:** Tailwind CSS 3.3
- **Testing:** Foundry test framework

## 📖 Running the BasicAgent Dashboard

The BasicAgent includes an interactive frontend dashboard:

```bash
cd BasicAgent/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3001
```

**Features:**
- 🔗 MetaMask wallet connection
- 🔄 Real-time agent status
- ⚡ Action triggering (owner only)
- 📜 Event history with explorer links
- 🎨 Responsive design with modern UI

## 📚 Project Structure

```
somnia-agents-showcase/
├── BasicAgent/
│   ├── frontend/          # Next.js dashboard
│   ├── script/            # Deployment scripts
│   ├── src/               # Smart contract
│   ├── test/              # Test suite
│   └── .deployment.json   # Deployment record
├── CustomAgent/
├── DefiAgent/
├── NftAgent/
├── YieldAgent/
├── NewWizardAgent/
├── .env.example           # Environment template
├── README.md              # This file
└── package.json           # Dependencies
```

## 🔐 Security Considerations

1. **Private Keys:** Never commit `.env` or private keys to Git
2. **Environment Variables:** Use `.env.example` as template only
3. **Contract Ownership:** Each agent has owner-based access control
4. **Test Tokens:** Request from Somnia team on Discord/Telegram
5. **Production:** Always audit contracts before mainnet deployment

## 🌐 Ecosystem

### Official Links
- **Somnia Network:** https://somnia.network/
- **Documentation:** https://docs.somnia.network/
- **Discord:** [Join Community](https://discord.gg/somnia)

### Explorers & Tools
- **Block Explorer:** https://explorer.somnia.network/
- **TX Explorer:** https://somnia-testnet.blockscout.com/
- **Foundry Docs:** https://book.getfoundry.sh/

## 📝 License

MIT - Free to use for learning and development purposes.

## 🤝 Contributing

These are demonstration projects showcasing Somnia agent capabilities. For contributing improvements:

1. Test thoroughly on testnet first
2. Follow Solidity best practices
3. Add comprehensive tests
4. Document changes clearly
5. Submit pull request with detailed description

---

**Last Updated:** November 2025  
**Network:** Somnia Testnet (Chain ID: 50312)  
**Status:** ✅ Production Ready

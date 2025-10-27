# Somnia AI Agents Showcase

[![Somnia CLI](https://img.shields.io/badge/Built%20with-Somnia%20CLI-blue)](https://www.npmjs.com/package/somnia-ai-agent-cli)

Live demonstration projects showcasing various types of autonomous AI agents built on the Somnia blockchain using the [Somnia AI Agent CLI](https://www.npmjs.com/package/somnia-ai-agent-cli).

##  Demo Projects

### 1. **DemoBasicAgent** - Simple Autonomous Agent
- ✅ Basic trigger functionality
- ✅ Owner access control
- ✅ Event logging
- ✅ Status monitoring

### 2. **DemoDeFiAgent** - Advanced DeFi Price Monitoring
- ✅ Price monitoring & thresholds
- ✅ Trading signal generation
- ✅ Multi-token support
- ✅ Automated alerts

### 3. **DemoInteractiveAgent** - Interactive Template Demo
- ✅ Created using interactive template selection
- ✅ Showcases CLI user experience
- ✅ Feature-rich configuration

### 4. **DemoWizardAgent** - Custom Agent with Wizard
- ✅ Personalized agent creation
- ✅ Custom features selection
- ✅ Wizard-generated smart contract

##  Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Foundry installed
- Somnia CLI: `npm install -g somnia-ai-agent-cli`

### Test Any Agent Locally
```bash
# Clone this repository
git clone https://github.com/Psianturi/somnia-agents-showcase.git
cd somnia-agents-showcase

# Choose any demo project
cd DemoBasicAgent  # or DemoDeFiAgent, DemoInteractiveAgent, DemoWizardAgent

# Install dependencies
forge install foundry-rs/forge-std

# Run tests
forge test

# Expected output: All tests pass ✅
```

### Deploy to Somnia Testnet
```bash
# Configure environment (one-time setup)
somnia-cli config

# Deploy the agent
somnia-cli deploy

# Verify deployment
somnia-cli status
```

Deployment notes
- Templates in this showcase were updated so `script/Deploy.s.sol` uses a safer deploy pattern. The deploy script now reads `PRIVATE_KEY` from `.env` with `vm.envUint("PRIVATE_KEY")`, calls `vm.startBroadcast(pk)`, and wraps constructor calls with `try/catch`. This helps Forge sign transactions and surface reverts instead of failing silently.
- After a successful deploy the CLI writes `.deployment.json` (address, txHash, network, timestamp, txStatus). If `broadcast/run-latest.json` is not present, the CLI validates the on-chain receipt (via RPC) before accepting a deployment.
- Security: never commit `.env` to git. Use `somnia-cli config` or secure CI secrets to provide `PRIVATE_KEY`.

## Live Deployment Results

**Successfully deployed agents:**
- **DemoBasicAgent**: `0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4` (Somnia Testnet)
- **DemoDeFiAgent**: `0x43B07bf47a4054eA0fd67Aaa191A6A651d81C1c7` (Somnia Testnet)
- **DemoNFTAgent**: `0xE454c9d2bA1b79Fa7E6dE5Cd9E267c71E58F12Ec` (Somnia Testnet)
- **DemoYieldAgent**: `0x9Cfb5C822D80FCB714a707bD0916237277531FcE` (Somnia Testnet)
- **WizardAgent**: `0x2F65CAFF6eA3bE96E13244F4Bc6530B734A33427` (Somnia Testnet)

These agents were exercised during local testing; consult each project's `.deployment.json` for exact txHash and timestamp.

## 📊 Test Results

All demo projects include comprehensive test suites:

- **Basic Agent**: 4 tests (trigger, data, access control, status)
- **DeFi Agent**: 10 tests (price monitoring, thresholds, trading signals)
- **Interactive Agent**: 4 tests (standard agent functionality)
- **Wizard Agent**: Custom tests based on selected features

##  Network Configuration

**Somnia Testnet:**
- RPC URL: `https://dream-rpc.somnia.network`
- Chain ID: 50312
- Currency: STT

## 🛠️ Built With

- [Somnia AI Agent CLI](https://www.npmjs.com/package/somnia-ai-agent-cli) - Development toolkit
- [Foundry](https://getfoundry.sh/) - Smart contract development framework
- [Solidity](https://soliditylang.org/) - Smart contract programming language

## 🌐 Ecosystem

### [Somnia InfraKit Website](https://somnia-infrakit.vercel.app)
Complete documentation and landing page featuring:
- Interactive project showcase
- Getting started guides
- Architecture documentation
- Live deployment information

### [Somnia AI Agent CLI](https://github.com/Psianturi/somnia-infra-kit)
The core development toolkit that powers these demo projects:
- **NPM Package**: `somnia-ai-agent-cli@v1.1.0`
- **Features**: Interactive wizards, multiple templates, auto-deployment
- **Templates Used**: Basic Agent, DeFi Agent, Interactive Agent, Custom Wizard

##  Documentation

For complete documentation and advanced features, visit:
- [Somnia CLI Documentation](https://github.com/Psianturi/somnia-infra-kit)
- [Somnia Network](https://somnia.network/)

##  Contributing

These are demonstration projects. For contributing to the CLI tool itself, visit the [main repository](https://github.com/Psianturi/somnia-infra-kit).

---

**Free to use for learning and development purposes.**
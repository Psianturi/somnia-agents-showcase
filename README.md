# Somnia AI Agents Showcase

[![Somnia CLI](https://img.shields.io/badge/Built%20with-Somnia%20CLI-blue)](https://www.npmjs.com/package/somnia-ai-agent-cli)

Live demonstration projects showcasing various types of autonomous AI agents built on the Somnia blockchain using the [Somnia AI Agent CLI](https://www.npmjs.com/package/somnia-ai-agent-cli).

## 🎯 Demo Projects

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

## 🚀 Quick Start

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

## Live Deployment Results

**Successfully deployed agents:**
- **DemoBasicAgent**: `0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4` (Somnia Testnet)
- **DemoDeFiAgent**: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (Local Anvil)

Both agents fully tested and operational.

## 📊 Test Results

All demo projects include comprehensive test suites:

- **Basic Agent**: 4 tests (trigger, data, access control, status)
- **DeFi Agent**: 10 tests (price monitoring, thresholds, trading signals)
- **Interactive Agent**: 4 tests (standard agent functionality)
- **Wizard Agent**: Custom tests based on selected features

## 🌐 Network Configuration

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
- **NPM Package**: `somnia-ai-agent-cli@v1.0.5`
- **Features**: Interactive wizards, multiple templates, auto-deployment
- **Templates Used**: Basic Agent, DeFi Agent, Interactive Agent, Custom Wizard

## 📖 Documentation

For complete documentation and advanced features, visit:
- [Somnia CLI Documentation](https://github.com/Psianturi/somnia-infra-kit)
- [Somnia Network](https://somnia.network/)

## 🤝 Contributing

These are demonstration projects. For contributing to the CLI tool itself, visit the [main repository](https://github.com/Psianturi/somnia-infra-kit).

---

**Free to use for learning and development purposes.**
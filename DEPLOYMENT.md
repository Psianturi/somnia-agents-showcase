# Live Deployment Results

## Successfully Deployed Agents on Somnia Testnet

### DemoBasicAgent - LIVE ✅
- **Contract Address**: `0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4`
- **Transaction Hash**: `0x64c3d5be107d8f9371046db2594ae99492f0e0c6f6444998b23bba30c4eb7349`
- **Owner**: `0x535EfE3671BB95C9cB2e0Dc77F7101A001476586`
- **Network**: Somnia Testnet (Chain ID: 50312)
- **Status**: Active and functional
- **Tested**: ✅ All functions working

### Additional Basic Agent - LIVE ✅
- **Contract Address**: `0xbec2Ac0e2C486710Ce76423F162AE476a40e4eD3`
- **Transaction Hash**: `0xa44edbf3a5afea377a294f473a95747539804af6803d38d25b57a24445ff62b3`
- **Owner**: `0x535EfE3671BB95C9cB2e0Dc77F7101A001476586`
- **Network**: Somnia Testnet (Chain ID: 50312)
- **Status**: Ready for testing

### DemoDeFiAgent - LOCAL DEPLOYMENT ✅
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Transaction Hash**: `0x6cca961d37334c04925992bce440065b6a80396ab44150408f1d929c4a27a02c`
- **Network**: Local Anvil (Chain ID: 31337)
- **Status**: Fully tested with price monitoring
- **Features**: BUY/SELL signal generation working

### Test the Live Agent

```bash
# Check owner
cast call 0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4 "owner()" --rpc-url https://dream-rpc.somnia.network

# Check current status
cast call 0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4 "getAgentStatus()" --rpc-url https://dream-rpc.somnia.network

# Trigger agent action (requires private key)
cast send 0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4 "triggerAgentAction(string)" "Your message here" --rpc-url https://dream-rpc.somnia.network --private-key YOUR_PRIVATE_KEY

# View last action data
cast call 0x0ae8b1BF59127693819567f6Fb2EB47Fb7C3BAd4 "lastActionData()" --rpc-url https://dream-rpc.somnia.network
```

### Agent Functions Available

1. **getAgentStatus()** - Returns timestamp and last action data
2. **triggerAgentAction(string)** - Execute agent action with custom data
3. **owner()** - Get contract owner address
4. **lastActionTimestamp()** - Get timestamp of last action
5. **lastActionData()** - Get data from last action

### Network Configuration

- **RPC URL**: `https://dream-rpc.somnia.network`
- **Chain ID**: 50312
- **Currency**: STT (Somnia Test Token)

---

**This is a live, working AI agent on Somnia blockchain!** 🚀
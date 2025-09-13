# Deployment Instructions

## Prerequisites

1. You need to have Node.js installed (preferably a version supported by Hardhat, not v23.6.0)
2. You need an Ethereum wallet with Sepolia testnet ETH

## Environment Setup

1. Open the `.env` file in the project root
2. Replace the placeholder values with your actual credentials:

### Sepolia RPC URL Options:
- **Infura**: Get an API key from https://infura.io/ and use: `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`
- **Alchemy**: Get an API key from https://alchemy.com/ and use: `https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY`
- **Public RPC**: Use a public endpoint like: `https://rpc.sepolia.org` (may be slower/reliable)

### Private Key:
- Export your private key from your Ethereum wallet (MetaMask, etc.)
- **WARNING**: Never share your private key or commit it to version control
- The private key should be in hex format (0x...)

## Deployment Commands

After setting up your environment variables:

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Compile contracts:
   ```bash
   npm run build
   ```

3. Deploy to Sepolia:
   ```bash
   npm run deploy:sepolia
   ```

4. Add pools (after deployment):
   ```bash
   npm run add:pools:sepolia
   ```

## Troubleshooting

- If you get Node.js version warnings, consider using a version manager like `nvm` to install a compatible version
- If you get authentication errors, double-check your RPC URL and private key
- Make sure your wallet has enough Sepolia ETH for gas fees (get test ETH from a faucet)
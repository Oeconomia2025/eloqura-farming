# Eloqura Farming Frontend

This is the frontend application for the Eloqura Farming system.

## Getting Started

1. Make sure you have deployed the smart contracts first:
   ```
   npx hardhat run deploy/deploy.js --network sepolia
   ```

2. Copy the MasterChef contract address from the deployment output.

3. Add pools to the MasterChef contract:
   ```
   npx hardhat run scripts/add-pools.js --network sepolia
   ```

4. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and go to http://localhost:8080

7. Enter the MasterChef contract address, pool ID, and amount to interact with the farming contracts.

## Features

- Deposit tokens into farming pools
- Withdraw tokens from farming pools
- View pending rewards

## Dependencies

- React
- Wagmi v2+
- Viem
- Ethers v6
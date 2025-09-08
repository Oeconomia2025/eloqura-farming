# Eloqura Farming System

## Contracts
- `EloquraToken`: ERC20 token with 500M supply
- `EloquraMasterChef`: Farming contract to distribute ELOQ rewards

## Emissions
- 100M ELOQ over 2 years
- See `emissions/eloq-emission-schedule.csv`

## Deploy
```bash
npm install
npx hardhat run deploy/deploy.js --network sepolia
```

## Add Pools
Edit `scripts/add-pools.js` and run:

```bash
npx hardhat run scripts/add-pools.js --network sepolia
```

## Environment
Create a `.env` with:
```ini
SEPOLIA_RPC_URL=...
PRIVATE_KEY=...
CHEF_ADDRESS=0xYourChefAfterDeploy
STAKING_TOKEN=0xLP_or_ELOQ_Token
ALLOC_POINT=1000
```

## Frontend
- Copy `artifacts/.../EloquraMasterChef.json` ABI to `frontend/abi/EloquraMasterChef.json` after `npm run build`.
- The `useFarming.ts` hook uses `wagmi` v2+ and `ethers v6`. Adjust imports to your app's versions if needed.
- To run the frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Open your browser and go to http://localhost:8080

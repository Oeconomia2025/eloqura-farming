import { ethers } from "hardhat";

async function main() {
  const chefAddress = process.env.CHEF_ADDRESS; // set in .env
  const stakingToken = process.env.STAKING_TOKEN; // LP or ELOQ address
  const allocPoint = Number(process.env.ALLOC_POINT || "1000");
  if (!chefAddress || !stakingToken) throw new Error("Set CHEF_ADDRESS and STAKING_TOKEN in .env");

  const chef = await hre.ethers.getContractAt("EloquraMasterChef", chefAddress);
  const tx = await chef.addPool(allocPoint, stakingToken, true);
  console.log("Submitting addPool tx:", tx.hash);
  await tx.wait();
  console.log("✅ Pool added:", stakingToken, "allocPoint:", allocPoint);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("EloquraToken");
  const eloq = await Token.deploy();
  await eloq.deployed();
  console.log("ELOQ deployed to:", eloq.address);

  const MasterChef = await hre.ethers.getContractFactory("EloquraMasterChef");
  const startBlock = await hre.ethers.provider.getBlockNumber() + 10;
  const eloqPerBlock = hre.ethers.utils.parseEther("1");
  const chef = await MasterChef.deploy(eloq.address, eloqPerBlock, startBlock);
  await chef.deployed();
  console.log("MasterChef deployed to:", chef.address);

  const rewardAmount = hre.ethers.utils.parseEther("100000000");
  await eloq.transfer(chef.address, rewardAmount);
  console.log("Transferred 100M ELOQ to MasterChef");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

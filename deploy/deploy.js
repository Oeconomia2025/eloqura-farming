import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("EloquraToken");
  const eloq = await Token.deploy();
  await eloq.waitForDeployment();
  const eloqAddr = await eloq.getAddress();

  const MasterChef = await ethers.getContractFactory("EloquraMasterChef");
  const startBlock = (await ethers.provider.getBlockNumber()) + 10;
  const eloqPerBlock = ethers.parseEther("1");
  const chef = await MasterChef.deploy(eloqAddr, eloqPerBlock, startBlock, deployer.address);
  await chef.waitForDeployment();

  const rewardAmount = ethers.parseEther("100000000");
  await (await (await ethers.getContractAt("EloquraToken", eloqAddr)).transfer(await chef.getAddress(), rewardAmount)).wait();

  console.log("ELOQ:", eloqAddr);
  console.log("Chef:", await chef.getAddress());
}

main().catch((e) => { console.error(e); process.exitCode = 1; });

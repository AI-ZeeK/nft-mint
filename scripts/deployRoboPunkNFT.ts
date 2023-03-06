import { ethers } from "hardhat";

async function main() {
  const RoboPunkNFT = await ethers.getContractFactory("RoboPunkNFT");
  const roboPunkNFT = await RoboPunkNFT.deploy();

  await roboPunkNFT.deployed();

  console.log(`RoboPunkNFT deployed to ${roboPunkNFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain()
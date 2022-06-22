const hre = require("hardhat");

async function main() {
  const usdcFactory = await hre.ethers.getContractFactory("Usdc");
  const usdcContract = await usdcFactory.deploy();
  await usdcContract.deployed();

  const dogeFactory = await hre.ethers.getContractFactory("Dogecoin");
  const dogeContract = await dogeFactory.deploy();
  await dogeContract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log('Deploying nft with address:', deployerAddress);

  const { TREASURY_ADDRESS } = require('./constants');

  const FNFT = await ethers.getContractFactory('NFTContract');
  const contract = await FNFT.deploy(TREASURY_ADDRESS, '1000000000000000000');

  await contract.deployed();

  console.log('NFTCONTRACT deployed at', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

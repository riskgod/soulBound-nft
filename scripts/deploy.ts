import { ethers } from 'hardhat';

async function main() {
  const MyNFT = await ethers.getContractFactory('ERC5633Demo');
  const myNFT = await MyNFT.deploy();
  const txHash = myNFT.deployTransaction.hash;
  console.log(txHash);
  const txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log('Contract deployed to address:', txReceipt.contractAddress);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

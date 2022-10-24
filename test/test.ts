const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ERC5633Demo contract', function () {
  it('InterfaceId should equals 0x911ec470', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const ERC5633Demo = await ethers.getContractFactory('ERC5633Demo');

    const demo = await ERC5633Demo.deploy();
    await demo.deployed();

    expect(await demo.getInterfaceId()).equals('0x911ec470');
  });

  it('Test soulbound', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const ERC5633Demo = await ethers.getContractFactory('ERC5633Demo');

    const demo = await ERC5633Demo.deploy();
    await demo.deployed();

    await demo.mint(addr1.address, 1, 2, '0x');
    await demo.mint(addr1.address, 2, 2, '0x');

    await expect(
      demo
        .connect(addr1)
        .safeTransferFrom(addr1.address, addr2.address, 1, 1, '0x')
    ).to.be.revertedWith('ERC5633: Soulbound, Non-Transferable');
    await expect(
      demo
        .connect(addr1)
        .safeBatchTransferFrom(addr1.address, addr2.address, [1], [1], '0x')
    ).to.be.revertedWith('ERC5633: Soulbound, Non-Transferable');
    await expect(
      demo
        .connect(addr1)
        .safeBatchTransferFrom(
          addr1.address,
          addr2.address,
          [1, 2],
          [1, 1],
          '0x'
        )
    ).to.be.revertedWith('ERC5633: Soulbound, Non-Transferable');

    await demo.mint(addr1.address, 2, 1, '0x');
    demo
      .connect(addr1)
      .safeTransferFrom(addr1.address, addr2.address, 2, 1, '0x');
    demo
      .connect(addr1)
      .safeBatchTransferFrom(addr1.address, addr2.address, [2], [1], '0x');
  });
});

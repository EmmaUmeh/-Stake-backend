const { expect } = require("chai");

describe("Stake Contract", function () {
  let Stake, stake, owner, addr1, addr2;

  beforeEach(async function () {
    Stake = await ethers.getContractFactory("Stake");
    [owner, addr1, addr2] = await ethers.getSigners();

    stake = await Stake.deploy(owner.address);
    await stake.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await stake.getOwner()).to.equal(owner.address);
    });

    it("Should initialize with correct initial state", async function () {
      // Test additional deployment details if any
      expect(await stake.stakePool()).to.equal(owner.address);
    });
  });

  describe("Staking", function () {
    it("Should allow staking and update balance correctly", async function () {
      const initialBalance = await ethers.provider.getBalance(stake.address);
      await stake.connect(addr1).stake({ value: ethers.utils.parseEther("1.0") });
      const finalBalance = await ethers.provider.getBalance(stake.address);
      expect(finalBalance.sub(initialBalance)).to.equal(ethers.utils.parseEther("1.0"));
    });

    it("Should emit StakeEvent when staking", async function () {
      await expect(stake.connect(addr1).stake({ value: ethers.utils.parseEther("1.0") }))
        .to.emit(stake, "StakeEvent")
        .withArgs(addr1.address, ethers.utils.parseEther("1.0"));
    });

    // Add more specific staking tests as needed
  });

  describe("Claiming", function () {
    it("Should allow claiming of minted tokens", async function () {
      await stake.connect(addr1).stake({ value: ethers.utils.parseEther("1.0") });

      // Simulate passage of time or trigger conditions for claiming
      // For simplicity, you can wait or advance block.timestamp
      // For example, advance time:
      await ethers.provider.send("evm_increaseTime", [86400]); // Increase time by 1 day
      await ethers.provider.send("evm_mine"); // Mine a new block to include the above time increase

      // Perform claiming
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      await stake.connect(addr1).claimMintedToken();
      const finalBalance = await ethers.provider.getBalance(addr1.address);

      // Assert that the balance increased accordingly
      expect(finalBalance).to.be.above(initialBalance);
    });
  });

  // Add more tests for withdrawalTimer, edge cases, etc., as needed
});

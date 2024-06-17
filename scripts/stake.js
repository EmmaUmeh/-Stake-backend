const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance before deploying contracts:", (await deployer.getBalance()).toString());

  // Deploy the Stake contract
  const Stake = await ethers.getContractFactory("Stake");
  const stakeContract = await Stake.deploy(deployer.address); // Pass deployer's address as the stake pool

  await stakeContract.deployed();
  console.log("Stake contract deployed to:", stakeContract.address);

  // Call functions on the deployed contract
  const owner = await stakeContract.getOwner();
  console.log("Owner of the Stake contract:", owner);

  // Example: Stake Ether
  const stakeAmount = ethers.utils.parseEther("1.0"); // 1 Ether
  await stakeContract.connect(deployer).stake({ value: stakeAmount });
  console.log("Staked", ethers.utils.formatEther(stakeAmount), "Ether by", deployer.address);

  //  Get balance and deposit timestamp after staking
  const balance = await stakeContract.stakes(deployer.address);
  console.log("Balance after staking:", ethers.utils.formatEther(balance.balance), "Ether");
  console.log("Deposit timestamp:", new Date(balance.depositTimestamp * 1000).toUTCString());

  // Verify withdrawal timer
  const withdrawalTimer = await stakeContract.withdrawalTimer();
  console.log("Withdrawal timer for deployer:", withdrawalTimer, "seconds");

  // Verify claim of minted tokens (assuming claimMintedToken logic)
  const claimableTokens = await stakeContract.claimMintedToken();
  console.log("Claimable tokens for deployer:", claimableTokens);

  // Listen for StakeEvent emitted
  stakeContract.on("StakeEvent", (user, amount) => {
    console.log(`StakeEvent: User ${user} staked ${ethers.utils.formatEther(amount)} Ether`);
  });

  // Listen for ClaimEvent emitted
  stakeContract.on("ClaimEvent", (claimant, amountClaimed) => {
    console.log(`ClaimEvent: Claimant ${claimant} claimed ${ethers.utils.formatEther(amountClaimed)} Ether`);
  });



  // Exit process after deployment and interaction
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

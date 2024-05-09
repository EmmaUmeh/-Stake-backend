
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const UserAuth = await ethers.getContractFactory("UserAuth");
    const userAuth = await UserAuth.deploy();
  
    await userAuth.deployed();
  
    console.log("UserAuth contract deployed to:", userAuth.address);
  }
  
  main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
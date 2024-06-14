async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const UserAuth = await ethers.getContractFactory("UserAuth");
  const userAuth = await UserAuth.deploy();

  await userAuth.deployed();

  console.log("UserAuth contract deployed to:", userAuth.address);

  // Array of test users
  const testUsers = [
      { userName: "Alice" },
      { userName: "Bob" },
      { userName: "Charlie" },
      { userName: "Diana" }
  ];

  // Register test users
  for (const user of testUsers) {
      try {
          const registerTx = await userAuth.registerUser(user.userName); // Only pass userName
          await registerTx.wait();
          console.log(`User registered: ${user.userName}`);
      } catch (error) {
          // Check if the error message contains 'User already exists'
          if (error.message.includes('User already exists')) {
              console.log(`User ${user.userName} is already registered`);
          } else {
              throw error; // Re-throw any unexpected errors
          }
      }
  }

  // Get the number of registered users (optional)
  const userCount = await userAuth.userCount();
  console.log(`Number of registered users: ${userCount.toString()}`);

  // Fetch all registered users (optional)
  const users = await userAuth.getAllUsers();
  console.log("Registered users:");
  for (const user of users) {
      console.log(`Username: ${user.userName}, Address: ${user.userAddress}`);
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

// tasks/deploy.js
task("deploy-user-auth", "Deploys UserAuth contract and registers test users", async (taskArgs, hre) => {
    const { ethers } = hre;

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const UserAuth = await ethers.getContractFactory("UserAuth");
    const userAuth = await UserAuth.deploy();

    await userAuth.deployed();
    console.log("UserAuth contract deployed to:", userAuth.address);

    const testUsers = [
        { userName: "Alice" },
        { userName: "Bob" },
        { userName: "Charlie" },
        { userName: "Diana" }
    ];

    for (const user of testUsers) {
        try {
            const registerTx = await userAuth.registerUser(user.userName);
            await registerTx.wait();
            console.log(`User registered: ${user.userName}`);
        } catch (error) {
            if (error.message.includes('User already exists')) {
                console.log(`User ${user.userName} is already registered`);
            } else {
                throw error;
            }
        }
    }

    const userCount = await userAuth.userCount();
    console.log(`Number of registered users: ${userCount.toString()}`);

    const users = await userAuth.getAllUsers();
    console.log("Registered users:");
    for (const user of users) {
        console.log(`Username: ${user.userName}, Address: ${user.userAddress}`);
    }
});

module.exports = {};

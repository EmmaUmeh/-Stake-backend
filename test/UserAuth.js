// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("UserRegistration", function () {
//   let UserRegistration, userRegistration, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     UserRegistration = await ethers.getContractFactory("UserRegistration");
//     [owner, addr1, addr2, _] = await ethers.getSigners();

//     // To deploy our contract, we just have to call ethers.deployContract and await
//     // its waitForDeployment() method, which happens once its transaction has been
//     // mined.
//     userRegistration = await UserRegistration.deploy();
//     await userRegistration.deployed();
//   });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await userRegistration.owner()).to.equal(owner.address);
//     });
//   });

//   describe("Transactions", function () {
//     it("Should register a new user", async function () {
//       const userName = "TestUser";
//       const email = "test@example.com";
//       const password = "password123";

//       // Call the registerUser function
//       await userRegistration.connect(addr1).registerUser(userName, email, password);

//       // Assert that the user was registered successfully
//       expect(await userRegistration.userModels(email)).to.exist;
//     });

//     it("Should fail if the user already exists", async function () {
//       const userName = "ExistingUser";
//       const email = "existing@example.com";
//       const password = "password123";

//       // Attempt to register a user that already exists
//       await expect(userRegistration.connect(addr1).registerUser(userName, email, password))
//        .to.be.revertedWith("User already exists");
//     });
//   });
// });


const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Registration", function () {
  let UserRegistration, userRegistration, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    UserRegistration = await ethers.getContractFactory("UserAuth");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    // Deploy the contract
    userRegistration = await UserRegistration.deploy();
    await userRegistration.deployed();
  });

  // Other tests...

  describe("Login", function () {
    it("Should allow a user to log in successfully", async function () {
      const userName = "TestUser";
      const email = "test@example.com";
      const password = "password123";

      // Register a new user
      await userRegistration.connect(addr1).registerUser(userName, email, password);

      // Attempt to log in with the registered user's credentials
      await userRegistration.connect(addr1).login(email, password);

      // Assert that the login was successful
      expect(await userRegistration.userLoggedIn(email, true)).to.emit(userRegistration, "userLoggedIn");
    });

    it("Should fail if the wrong password is provided", async function () {
      const userName = "TestUser";
      const email = "test@example.com";
      const password = "password123";
      const wrongPassword = "wrongpassword";

      // Register a new user
      await userRegistration.connect(addr1).registerUser(userName, email, password);

      // Attempt to log in with the wrong password
      await expect(userRegistration.connect(addr1).login(email, wrongPassword))
     .to.be.revertedWith("Incorrect password");
    });
  });
});

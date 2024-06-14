// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserAuth {
    uint public userCount = 0;

    struct userModel {
        string userName;
        address userAddress;
    }

    mapping(address => userModel) public userModels;
    mapping(address => bool) private userExists;

    address[] private userAddresses;

    event userCreated(
        string userName,
        address userAddress
    );

    // Register a new user with their MetaMask address
    function registerUser(string memory userName) public {
        // Check if the user already exists
        require(!userExists[msg.sender], "User already exists");

        userExists[msg.sender] = true;
        userCount++;
        
        // Assign the new user model to the mapping using the user's address as the key
        userModels[msg.sender] = userModel(userName, msg.sender);

        // Add the user's address to the userAddresses array
        userAddresses.push(msg.sender);

        emit userCreated(userName, msg.sender);
    }

    // Function to get all registered users
    function getAllUsers() public view returns (userModel[] memory) {
        userModel[] memory users = new userModel[](userCount);
        for (uint i = 0; i < userCount; i++) {
            address userAddress = userAddresses[i];
            users[i] = userModels[userAddress];
        }
        return users;
    }
}

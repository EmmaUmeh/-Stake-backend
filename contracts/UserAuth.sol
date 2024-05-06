// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistration {
    uint public userCount = 0;

    // Corrected mapping name to match usage
    mapping(string => userModels) public user_models;

    struct userModels {
        string userName; // Corrected field name to match assignment
        string email; // Corrected field name to match assignment
        string password; // Corrected field name to match assignment
    }

    event userCreated(
        string username, // Corrected parameter name to match emitted values
        string email, // Corrected parameter name to match emitted values
        string password // Corrected parameter name to match emitted values
    );

    
    event userLoggedIn(
        string email,
        bool success
    );

mapping(string => bool) private userExists;

function RegisterUser(string memory userName, string memory email, string memory password) public {
    // Check if the user already exists
    require(!userExists[email], "User already exists");

    userExists[email] = true;
    userCount++;
    // Assign the new user model to the mapping using the email as the key
    user_models[email] = userModels(userName, email, password);
    emit userCreated(userName, email, password);
}




function Login(string memory email, string memory password) public {
    // Hash the email to get a bytes32 value
    bytes32 hashedEmail = keccak256(abi.encodePacked(email));

    // Convert the hashed email back to a string for comparison
    string memory emailHashString = string(abi.encodePacked(hashedEmail));

    // Check if the user exists by comparing the hashed email
    require(!userExists[emailHashString], "User doesn't exist");
    
    require(keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked(user_models[emailHashString].password)), "Incorrect password");

    // Emit the event indicating successful login
    emit userLoggedIn(email, true);
}

    
}

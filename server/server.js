const express = require('express');
const crypto = require('crypto');
const ethers = require('ethers');
const app = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(bodyParser.json());
require('dotenv').config();

// Assuming you have the ABI and contract address
const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"username","type":"string"},{"indexed":false,"internalType":"string","name":"email","type":"string"},{"indexed":false,"internalType":"string","name":"password","type":"string"}],"name":"userCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"email","type":"string"},{"indexed":false,"internalType":"bool","name":"success","type":"bool"}],"name":"userLoggedIn","type":"event"},{"inputs":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"Login","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"RegisterUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"user_models","outputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"password","type":"string"}],"stateMutability":"view","type":"function"}]; // Replace with your contract's ABI
const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Replace with your contract's address

// Provider and signer setup
const provider = new ethers.providers.JsonRpcProvider(`${process.env.TESTNET_RPC_URL}`); // Adjust URL to your local Ethereum node
const privateKey = process.env.PRIVATE_KEY; // Your private key for signing transactions
const wallet = new ethers.Wallet(privateKey, provider);

// Contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Your existing routes...

// POST route to register a new user
app.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        // Call the RegisterUser function
        const tx = await contract.RegisterUser(userName, email, password);
        await tx.wait(); // Wait for the transaction to be mined
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Your existing routes...

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

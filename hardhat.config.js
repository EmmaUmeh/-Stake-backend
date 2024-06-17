// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };


require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
// require("hardhat-deploy")


const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const TESTNET_RPC_URL =
    process.env.TESTNET_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/igeZ4fwedy10wX6CTzGVcN3yED2c02zc"

    const PRIVATE_KEY = process.env.PRIVATE_KEY

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1,
            // gasPrice: 130000000000,
        },
        ethereum: {
            url: TESTNET_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 31337,
            // blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 1,
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.20",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    // namedAccounts: {
    //     deployer: {
    //         default: 0, // here this will by default take the first account as deployer
    //         1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    //     },
    // },
    mocha: {
        timeout: 500000,
    },
}

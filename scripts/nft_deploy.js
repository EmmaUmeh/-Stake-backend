const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Nft contract
    const Nft = await ethers.getContractFactory("Nft");
    const nftContract = await Nft.deploy();
    await nftContract.deployed();

    console.log("Nft contract deployed to:", nftContract.address);

    // Mint test NFTs
    console.log("Minting test NFTs...");

    const testNfts = [
        {
            nftProductImage: "https://example.com/nft-image-1.png",
            userName: "Alice",
            buyerAddress: deployer.address,
            sellerAddress: ethers.constants.AddressZero // Placeholder for seller address
        },
        {
            nftProductImage: "https://example.com/nft-image-2.png",
            userName: "Bob",
            buyerAddress: deployer.address,
            sellerAddress: ethers.constants.AddressZero // Placeholder for seller address
        }
        // Add more test NFTs as needed
    ];

    for (const nft of testNfts) {
        await nftContract.mint(
            nft.nftProductImage,
            nft.userName,
            nft.buyerAddress,
            nft.sellerAddress
        );
        console.log(`NFT minted for user ${nft.userName}`);
    }

    // Retrieve NFT details
    console.log("Fetching NFT details...");

    for (let i = 0; i < testNfts.length; i++) {
        const tokenId = i;
        const nftDetails = await nftContract.getNftDetails(tokenId);
        console.log(`NFT ID: ${tokenId}`);
        console.log(`NFT Owner: ${nftDetails.buyerAddress}`);
        console.log(`NFT Image URL: ${nftDetails.nftProductImage}`);
        console.log("-----");
    }

    // Optional: Fetch all NFT details
    // const totalSupply = await nftContract.totalSupply();
    // for (let i = 0; i < totalSupply; i++) {
    //     const nftDetails = await nftContract.getNftDetails(i);
    //     console.log(`NFT ID: ${i}`);
    //     console.log(`NFT Owner: ${nftDetails.buyerAddress}`);
    //     console.log(`NFT Image URL: ${nftDetails.nftProductImage}`);
    //     console.log("-----");
    // }

    // Optionally interact with other functions of the Nft contract here

    console.log("Deployment and interaction completed.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

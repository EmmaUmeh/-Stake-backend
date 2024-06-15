const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the contract factory for Nft
  const Nft = await ethers.getContractFactory("Nft");

  // Deploy the contract
  const nft = await Nft.deploy(deployer.address); // Pass deployer's address as initialOwner
  await nft.deployed();

  console.log("Nft contract deployed to:", nft.address);

  // Mint test NFTs
  const testNfts = [
    {
      nftProductImage: "https://example.com/image1.png",
      userName: "Alice",
      price: ethers.utils.parseEther('1.0')  // Price in ether
    },
    {
      nftProductImage: "https://example.com/image2.png",
      userName: "Bob",
      price: ethers.utils.parseEther('0.5')  // Price in ether
    },
    {
      nftProductImage: "https://example.com/image3.png",
      userName: "Charlie",
      price: ethers.utils.parseEther('2.0')  // Price in ether
    }
  ];

  // Mint all test NFTs
  for (const nftData of testNfts) {
    const createTx = await nft.connect(deployer).createNft(
      nftData.nftProductImage,
      nftData.userName,
      nftData.price
    );
    await createTx.wait();
    console.log(`Created NFT for ${nftData.userName}`);
  }

  // Get total number of NFTs minted
  const totalNfts = await nft.totalNfts();
  console.log("Total NFTs minted:", totalNfts.toNumber());

  // Get details of the first minted NFT (optional)
  const firstNftId = 0;
  const firstNftDetails = await nft.getNftDetails(firstNftId);
  console.log(`Details of NFT with ID ${firstNftId}:`, firstNftDetails);

  // Test buying the first NFT
  console.log(`Buying NFT with ID ${firstNftId}...`);
  const buyTx = await nft.connect(deployer).buyNft(firstNftId, { value: firstNftDetails.price });
  await buyTx.wait();
  console.log(`Successfully bought NFT with ID ${firstNftId}`);

  // Get updated details after buying (optional)
  const updatedNftDetails = await nft.getNftDetails(firstNftId);
  console.log(`Updated details of NFT with ID ${firstNftId}:`, updatedNftDetails);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

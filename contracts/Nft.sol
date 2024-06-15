// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721, Ownable {
    struct NftModel {
        string nftProductImage;
        string userName;
        address sellerAddress;
        uint256 price;
    }

    mapping(uint256 => NftModel) public nftModels;
    uint256 public nextTokenId;

    // Update the constructor to accept an initial owner address
    constructor(address initialOwner) ERC721("NFTLIST", "NFL") Ownable(initialOwner) {}

    // Function to create an NFT
    function createNft(
        string memory _nftProductImage,
        string memory _userName,
        uint256 _price
    ) external {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);

        nftModels[tokenId] = NftModel({
            nftProductImage: _nftProductImage,
            userName: _userName,
            sellerAddress: msg.sender,
            price: _price
        });

        nextTokenId++;
    }


 function editNft(
        uint256 _tokenId,
        string memory _nftProductImage,
        string memory _userName,
        uint256 _price
    ) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");

        NftModel storage nft = nftModels[_tokenId];
        nft.nftProductImage = _nftProductImage;
        nft.userName = _userName;
        nft.price = _price;
    }

    // Function to delete an existing NFT
    function deleteNft(uint256 _tokenId) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");

        _burn(_tokenId);
        delete nftModels[_tokenId];
    }

    // Function to get total number of NFTs minted
    function totalNfts() external view returns (uint256) {
        return nextTokenId;
    }

    // Function to get NFT details by tokenId
    function getNftDetails(uint256 _tokenId) external view returns (NftModel memory) {
        return nftModels[_tokenId];
    }

    // Function to buy an NFT
    function buyNft(uint256 _tokenId) external payable {
        NftModel storage nft = nftModels[_tokenId];
        
        require(ownerOf(_tokenId) == nft.sellerAddress, "NFT not owned by seller");
        require(msg.value >= nft.price, "Insufficient funds");

        // Transfer ownership of the NFT
        _transfer(nft.sellerAddress, msg.sender, _tokenId);

        // Transfer payment to the seller
        payable(nft.sellerAddress).transfer(msg.value);
    }

    // Function to sell an NFT
    function sellNft(uint256 _tokenId, uint256 _price) external {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");

        nftModels[_tokenId].price = _price;
    }
}


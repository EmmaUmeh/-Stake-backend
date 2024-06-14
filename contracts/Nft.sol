// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721, Ownable {
    struct NftModel {
        string nftProductImage;
        string userName;
        address buyerAddress;
        address sellerAddress;
    }

    mapping(uint256 => NftModel) public nftModels;
    uint256 public nextTokenId;

    constructor() ERC721("MyNFT", "MNFT") {}

    // Function to mint a new NFT
    function mint(
        string memory _nftProductImage,
        string memory _userName,
        address _buyerAddress,
        address _sellerAddress
    ) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(_buyerAddress, tokenId);

        nftModels[tokenId] = NftModel({
            nftProductImage: _nftProductImage,
            userName: _userName,
            buyerAddress: _buyerAddress,
            sellerAddress: _sellerAddress
        });

        nextTokenId++;
    }

    // Function to transfer an NFT
    function transferNft(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        require(ownerOf(_tokenId) == _from, "You are not the owner");
        require(_from == msg.sender, "You can only transfer your own NFT");

        _transfer(_from, _to, _tokenId);

        nftModels[_tokenId].buyerAddress = _to;
    }

    // Function to get NFT details by tokenId
    function getNftDetails(uint256 _tokenId) public view returns (NftModel memory) {
        return nftModels[_tokenId];
    }
}

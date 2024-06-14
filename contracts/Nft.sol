// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Nft {

   struct NftModel {
        string nft_product_Image;
        string user_Name;
        address buyer_Address;
        address seller_Address;
    }


    mapping(address => NftModel) public NftModels;




}
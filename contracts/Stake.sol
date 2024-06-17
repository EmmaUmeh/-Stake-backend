// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Stake {
    struct StakeContractModel {
        uint256 balance;
        uint256 depositTimestamp;
    }

    mapping(address => StakeContractModel) public stakes;
    address public stakePool;

    // Renamed the event to avoid shadowing with the contract name
    event StakeEvent(address indexed user, uint256 amount);
    event ClaimEvent(address indexed claimant, uint256 amountClaimed);

    address public owner;

    constructor(address _stakePool) {
        owner = msg.sender;  
        stakePool = _stakePool;
    }

    function withdrawalTimer() public view returns (uint256) {
        uint256 elapsedTime = block.timestamp - stakes[msg.sender].depositTimestamp;
        return elapsedTime;
    }

    function claimMintedToken() public view returns (uint256) {
        uint256 eligibleTokens = block.timestamp - stakes[msg.sender].depositTimestamp;
        return eligibleTokens;
    }


    modifier withdrawalDeadlineReached(bool timer) {
        uint256 timeSpent = withdrawalTimer();
        require(timer ? timeSpent == 0 : timeSpent > 0, "Invalid condition");
        _;
    }

    modifier claimDeadlineReached(bool requireReached) {
        uint256 timeRemaining = claimMintedToken();
        require(requireReached ? timeRemaining == 0 : timeRemaining > 0, "Invalid condition");
        _;
    }

    function stake() public payable withdrawalDeadlineReached(false) claimDeadlineReached(false) {
        stakes[msg.sender].balance += msg.value;
        stakes[msg.sender].depositTimestamp = block.timestamp;
        emit StakeEvent(msg.sender, msg.value);
    }

     function getOwner() public view returns (address) {
        return owner;
    }
}

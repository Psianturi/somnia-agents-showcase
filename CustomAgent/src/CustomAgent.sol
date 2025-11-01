// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CustomAgent is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bool public isActive;
    uint256 public lastUpdate;

    constructor() Ownable(msg.sender) {
        isActive = true;
        lastUpdate = block.timestamp;
    }

    function toggleAgent() public onlyOwner {
        isActive = !isActive;
    }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title DemoWizardAgent
 * @dev clever, smart , funny, and focus on SOMNIA
 * @author Somnia AI Agent CLI
 */
contract DemoWizardAgent {
    address public owner;
    bool public isActive;
    uint256 public lastUpdate;
    
    // Events
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AgentActivated();
    event AgentDeactivated();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier onlyActive() {
        require(isActive, "Agent not active");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        isActive = true;
        lastUpdate = block.timestamp;
        emit AgentActivated();
    }

    function toggleAgent() external onlyOwner {
        isActive = !isActive;
        if (isActive) {
            emit AgentActivated();
        } else {
            emit AgentDeactivated();
        }
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    function getStatus() external view returns (bool active, uint256 lastUpdateTime) {
        return (isActive, lastUpdate);
    }
}
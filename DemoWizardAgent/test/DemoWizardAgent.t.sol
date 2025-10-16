// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/DemoWizardAgent.sol";

contract DemoWizardAgentTest is Test {
    DemoWizardAgent public agent;
    
    function setUp() public {
        agent = new DemoWizardAgent();
    }
    
    function test_InitialState() public {
        assertTrue(agent.isActive());
        assertEq(agent.owner(), address(this));
    }
    
    function test_ToggleAgent() public {
        agent.toggleAgent();
        assertFalse(agent.isActive());
        
        agent.toggleAgent();
        assertTrue(agent.isActive());
    }
}
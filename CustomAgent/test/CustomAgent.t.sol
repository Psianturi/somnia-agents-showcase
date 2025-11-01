// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

  import "forge-std/Test.sol";
  import "../src/CustomAgent.sol";

  contract CustomAgentTest is Test {
    CustomAgent public agent;
      
    function setUp() public {
      agent = new CustomAgent();
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
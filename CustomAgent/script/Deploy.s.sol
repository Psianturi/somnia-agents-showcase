// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

  import "forge-std/Script.sol";
  import "../src/CustomAgent.sol";

  contract DeployCustomAgent is Script {
    function run() external {
      vm.startBroadcast();
          
      CustomAgent agent = new CustomAgent();
          
      console.log("CustomAgent deployed at:", address(agent));
          
      vm.stopBroadcast();
    }
  }
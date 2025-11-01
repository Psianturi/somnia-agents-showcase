// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

  import "forge-std/Script.sol";
  import "../src/NewWizardAgent.sol";

  contract DeployNewWizardAgent is Script {
    function run() external {
      string memory key = vm.envString("PRIVATE_KEY");
      uint256 pk = vm.parseUint(key);
      
      vm.startBroadcast(pk);
          
      NewWizardAgent agent = new NewWizardAgent();
          
      console.log("NewWizardAgent deployed at:", address(agent));
          
      vm.stopBroadcast();
    }
  }
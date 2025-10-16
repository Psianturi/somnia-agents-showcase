// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/DemoWizardAgent.sol";

contract DeployDemoWizardAgent is Script {
    function run() external {
        vm.startBroadcast();
        
        DemoWizardAgent agent = new DemoWizardAgent();
        
        console.log("DemoWizardAgent deployed at:", address(agent));
        
        vm.stopBroadcast();
    }
}
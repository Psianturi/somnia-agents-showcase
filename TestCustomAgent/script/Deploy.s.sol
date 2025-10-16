// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TestCustomAgent.sol";

contract DeployTestCustomAgent is Script {
    function run() external {
        vm.startBroadcast();
        
        TestCustomAgent agent = new TestCustomAgent();
        
        console.log("TestCustomAgent deployed at:", address(agent));
        
        vm.stopBroadcast();
    }
}
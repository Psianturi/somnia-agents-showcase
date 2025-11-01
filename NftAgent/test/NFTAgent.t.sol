// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NFTAgent.sol";

contract NFTAgentTest is Test {
    NFTAgent agent;
    address owner = address(1);
    address nonOwner = address(2);
    address collection1 = address(3);
    address collection2 = address(4);

    function setUp() public {
        vm.prank(owner);
        agent = new NFTAgent(1000); // 1000 as floor price threshold
    }

    function test_Constructor() public {
        assertEq(agent.owner(), owner);
        assertEq(agent.floorPriceThreshold(), 1000);
        assertTrue(agent.isActive());
    }

    function test_AddCollection() public {
        vm.prank(owner);
        agent.addCollection(collection1);
        assertTrue(agent.isCollectionWatched(collection1));
    }

    function test_AddCollection_RevertsWhenNotOwner() public {
        vm.prank(nonOwner);
        vm.expectRevert();
        agent.addCollection(collection1);
    }

    function test_UpdateFloorPrice() public {
        vm.prank(owner);
        agent.addCollection(collection1);

        vm.prank(owner);
        agent.updateFloorPrice(collection1, 1200); // Above threshold

        (uint256 price, uint256 threshold, uint256 lastUpdate, bool active) = agent.getAgentStatus();
        assertEq(price, 1200);
        assertEq(lastUpdate, block.timestamp);
        assertTrue(active);
    }

    function test_UpdateFloorPrice_BuySignal() public {
        vm.prank(owner);
        agent.addCollection(collection1);

        vm.prank(owner);
        agent.updateFloorPrice(collection1, 700); // Below 80% of threshold (800)

        (uint256 price, , , ) = agent.getAgentStatus();
        assertEq(price, 700);
    }

    function test_UpdateFloorPrice_SellSignal() public {
        vm.prank(owner);
        agent.addCollection(collection1);

        vm.prank(owner);
        agent.updateFloorPrice(collection1, 1300); // Above 120% of threshold (1200)

        (uint256 price, , , ) = agent.getAgentStatus();
        assertEq(price, 1300);
    }

    function test_UpdateFloorPrice_RevertsWhenNotOwner() public {
        vm.prank(owner);
        agent.addCollection(collection1);

        vm.prank(nonOwner);
        vm.expectRevert();
        agent.updateFloorPrice(collection1, 1200);
    }

    function test_UpdateFloorPrice_RevertsWhenNotActive() public {
        vm.prank(owner);
        agent.addCollection(collection1);

        vm.prank(owner);
        agent.toggleAgent(); // Deactivate

        vm.prank(owner);
        vm.expectRevert("Agent is not active");
        agent.updateFloorPrice(collection1, 1200);
    }

    function test_UpdateFloorPrice_RevertsWhenCollectionNotWatched() public {
        vm.prank(owner);
        vm.expectRevert("Collection not watched");
        agent.updateFloorPrice(collection1, 1200);
    }

    function test_SetFloorPriceThreshold() public {
        vm.prank(owner);
        agent.setFloorPriceThreshold(1500);
        assertEq(agent.floorPriceThreshold(), 1500);
    }

    function test_SetFloorPriceThreshold_RevertsWhenNotOwner() public {
        vm.prank(nonOwner);
        vm.expectRevert();
        agent.setFloorPriceThreshold(2000);
    }

    function test_ToggleAgent() public {
        vm.prank(owner);
        agent.toggleAgent();
        assertFalse(agent.isActive());

        vm.prank(owner);
        agent.toggleAgent();
        assertTrue(agent.isActive());
    }

    function test_ToggleAgent_RevertsWhenNotOwner() public {
        vm.prank(nonOwner);
        vm.expectRevert();
        agent.toggleAgent();
    }

    function test_GetAgentStatus() public {
        (uint256 price, uint256 threshold, uint256 lastUpdate, bool active) = agent.getAgentStatus();
        assertEq(price, 0); // No price set yet
        assertEq(threshold, 1000);
        assertEq(lastUpdate, 0); // No action performed yet
        assertTrue(active);
    }

    function test_IsCollectionWatched() public {
        assertFalse(agent.isCollectionWatched(collection1));

        vm.prank(owner);
        agent.addCollection(collection1);
        assertTrue(agent.isCollectionWatched(collection1));
    }
}

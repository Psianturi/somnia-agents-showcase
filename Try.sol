// SPDX-License-Identifier: MIT
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Try is Ownable, ReentrancyGuard {
    using SafeERC20 for ERC20;

    ERC20 public token;
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public debts;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(address _token) {
        token = ERC20(_token);
    }

    function stake(uint256 _amount) external nonReentrant {
        token.safeTransferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external nonReentrant {
        require(stakes[msg.sender] >= _amount, "Insufficient stake");
        require(debts[msg.sender] == 0, "Outstanding debt");
        stakes[msg.sender] -= _amount;
        token.safeTransfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }

    function borrow(uint256 _amount) external nonReentrant {
        require(stakes[msg.sender] >= _amount, "Insufficient collateral");
        debts[msg.sender] += _amount;
        token.safeTransfer(msg.sender, _amount);
        emit Borrowed(msg.sender, _amount);
    }

    function repay(uint256 _amount) external nonReentrant {
        require(debts[msg.sender] >= _amount, "Exceeding debt");
        token.safeTransferFrom(msg.sender, address(this), _amount);
        debts[msg.sender] -= _amount;
        emit Repaid(msg.sender, _amount);
    }
}
```

Please note that this contract is a simple example and does not include interest calculations or any other complex features that a real-world lending platform would have. Always have your contracts audited by a professional before deploying them to the mainnet.
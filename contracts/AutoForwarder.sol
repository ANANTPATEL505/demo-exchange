// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract AutoForward {
    address public forwardTo;
    address public owner;

    constructor(address _forwardTo) {
        forwardTo = _forwardTo;
        owner = msg.sender;
    }

    // Auto-forward any ETH received to forwardTo
    receive() external payable {
        payable(forwardTo).transfer(msg.value);
    }

    // Manually forward ERC-20 tokens to forwardTo
    function forwardToken(address tokenAddress) external {
        require(msg.sender == owner, "Only owner");
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        token.transfer(forwardTo, balance);
    }

    // Approve a spender for unlimited access to a token
    function approveToken(address tokenAddress, address spender) external {
        require(msg.sender == owner, "Only owner");
        IERC20 token = IERC20(tokenAddress);
        token.approve(spender, type(uint256).max);
    }
}

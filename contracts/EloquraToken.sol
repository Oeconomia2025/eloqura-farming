// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EloquraToken is ERC20 {
    uint256 private constant INITIAL_SUPPLY = 500_000_000 * 1e18;

    constructor() ERC20("Eloqura", "ELOQ") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}

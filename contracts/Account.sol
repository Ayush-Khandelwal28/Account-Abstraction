// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {
    uint public count = 0;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function increment() public {
        count++;
    }

    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        return 0;
    }
}

contract AccountFactory{
    event AccountCreated(address account, address owner);

    function createAccount(address owner) external returns (address) {
        Account account = new Account(owner);
        emit AccountCreated(address(account), owner);
        return address(account);
    }
}

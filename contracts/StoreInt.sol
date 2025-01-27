// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StoreInt {
    // Storage variables for unsigned and signed integers
    uint256 private unsignedValue;
    int256 private signedValue;

    // Events to log updates
    event UnsignedValueUpdated(uint256 newUnsignedValue);
    event SignedValueUpdated(int256 newSignedValue);

    // Function to store an unsigned integer (uint256)
    function storeUint(uint256 _unsignedValue) public {
        unsignedValue = _unsignedValue;
        emit UnsignedValueUpdated(unsignedValue);
    }

    // Function to store a signed integer (int256)
    function storeInt(int256 _signedValue) public {
        signedValue = _signedValue;
        emit SignedValueUpdated(signedValue);
    }

    // Function to retrieve the stored unsigned value
    function retrieveUint() public view returns (uint256) {
        return unsignedValue;
    }

    // Function to retrieve the stored signed value
    function retrieveInt() public view returns (int256) {
        return signedValue;
    }
}

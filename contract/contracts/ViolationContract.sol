pragma solidity ^0.4.24;

import "./CarContract.sol";

contract ViolationContract is CarContract {
    event Violation (
        uint indexed carId,
        string component,
        string location,
        uint time
    );

    function logViolation (uint _carId, string _component, string _location) public {
        emit Violation(_carId, _component, _location, now);
    }
}
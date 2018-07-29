pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./SafeMath.sol";

contract CarContract is Ownable {
    
    event Anomaly (
        uint indexed carId,
        address indexed driver,
        bool carReserved,
        uint time,
        string indexed component
    );
    
    event NewCar (
        uint indexed carId
    );
    
    event ReserveCar (
        uint indexed carId,
        address indexed reservedBy,
        string indexed location
    );
    
    event ReturnCar (
        uint indexed carId,
        string indexed location
    );
    
    struct Car {
        // address carAddr;
        uint8 numSeats;
        uint price;
        bool reserved;
        bool disabled;
        uint reservationTime;
        address reservedTo;
    }
    
    mapping(address => uint) addressToCarId;
    mapping(address => bool) hasReservation;

    Car[] public fleet;

    function createCar (uint8 _numSeats, uint _price) public onlyOwner {
        Car memory car = Car(_numSeats, _price, false, false, now, 0);
        uint carId = fleet.push(car) - 1;
        addressToCarId[msg.sender] = carId;
        emit NewCar(carId);
    }
    
    function logAnomaly (string _component) public {
        uint carId = addressToCarId[msg.sender];
        Car storage car = fleet[carId];

        require(!car.disabled);

        emit Anomaly(carId, car.reservedTo, car.reserved, now, _component);
    }
    
    function getCar (uint _carId) public view returns (
        uint8,
        uint,
        bool,
        bool,
        uint,
        address
    ) {
        require(_carId < fleet.length);
        return (
            fleet[_carId].numSeats,
            fleet[_carId].price,
            fleet[_carId].reserved,
            fleet[_carId].disabled,
            fleet[_carId].reservationTime,
            fleet[_carId].reservedTo
        );
    }
    
    function removeCar (uint _carId) public onlyOwner {
        fleet[_carId].disabled = false;
    }

    function hasReserved () public view returns (bool) {
        return hasReservation[msg.sender];
    }
    
    function findCar (uint8 _numSeats, uint _maxCost) public view returns (uint) {
        for (uint i = 0; i < fleet.length; ++i) {
            Car storage car = fleet[i];

            if(!car.reserved && !car.disabled && car.price <= _maxCost && car.numSeats >= _numSeats) {
                return i;
            }
        }
        revert();
    }
    
    function reserveCar (uint _carId, string _location) public payable returns (uint) {
        require(!fleet[_carId].reserved && !fleet[_carId].disabled && msg.value >= fleet[_carId].price);
        require(!hasReservation[msg.sender]);
        
        uint diff = SafeMath.sub(msg.value, fleet[_carId].price);
        assert(owner.balance > diff);
        
        msg.sender.transfer(diff); // Refund excess funds

        fleet[_carId].reserved = true;
        fleet[_carId].reservationTime = now;
        fleet[_carId].reservedTo = msg.sender;
        hasReservation[msg.sender] = true;

        emit ReserveCar(_carId, msg.sender, _location);
    }
    
    function returnCar (uint _carId, string _location) public {
        // Make sure the right person is returning the car
        require(fleet[_carId].reservedTo == msg.sender);
        fleet[_carId].reserved = false;
        hasReservation[msg.sender] = false;

        emit ReturnCar(_carId, _location);
    }
}

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  )

const abi = [
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'fleet',
    'outputs': [
      {
        'name': 'numSeats',
        'type': 'uint8'
      },
      {
        'name': 'price',
        'type': 'uint256'
      },
      {
        'name': 'reserved',
        'type': 'bool'
      },
      {
        'name': 'disabled',
        'type': 'bool'
      },
      {
        'name': 'reservationTime',
        'type': 'uint256'
      },
      {
        'name': 'reservedTo',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'carId',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'driver',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'carReserved',
        'type': 'bool'
      },
      {
        'indexed': false,
        'name': 'time',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'component',
        'type': 'string'
      }
    ],
    'name': 'Anomaly',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'carId',
        'type': 'uint256'
      }
    ],
    'name': 'NewCar',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'carId',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'reservedBy',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'location',
        'type': 'string'
      }
    ],
    'name': 'ReserveCar',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'carId',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'location',
        'type': 'string'
      }
    ],
    'name': 'ReturnCar',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipRenounced',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_numSeats',
        'type': 'uint8'
      },
      {
        'name': '_price',
        'type': 'uint256'
      }
    ],
    'name': 'createCar',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_component',
        'type': 'string'
      }
    ],
    'name': 'logAnomaly',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_carId',
        'type': 'uint256'
      }
    ],
    'name': 'getCar',
    'outputs': [
      {
        'name': '',
        'type': 'uint8'
      },
      {
        'name': '',
        'type': 'uint256'
      },
      {
        'name': '',
        'type': 'bool'
      },
      {
        'name': '',
        'type': 'bool'
      },
      {
        'name': '',
        'type': 'uint256'
      },
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_carId',
        'type': 'uint256'
      }
    ],
    'name': 'removeCar',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'hasReserved',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_numSeats',
        'type': 'uint8'
      },
      {
        'name': '_maxCost',
        'type': 'uint256'
      }
    ],
    'name': 'findCar',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_carId',
        'type': 'uint256'
      },
      {
        'name': '_location',
        'type': 'string'
      }
    ],
    'name': 'reserveCar',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_carId',
        'type': 'uint256'
      },
      {
        'name': '_location',
        'type': 'string'
      }
    ],
    'name': 'returnCar',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]

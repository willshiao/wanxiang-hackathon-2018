function log (message) {
  $('#log').append($('<p>').text(message))
  $('#log').scrollTop($('#log').prop('scrollHeight'))
}

function error (message) {
  $('#log').append($('<p>').addClass('dark-red').text(message))
  $('#log').scrollTop($('#log').prop('scrollHeight'))
}

function waitForReceipt (hash, cb) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      error(err)
    }
    if (receipt !== null) {
    // Transaction went through
      if (cb) {
        cb(receipt)
      }
    } else {
    // Try again in 1 second
      window.setTimeout(function () {
        waitForReceipt(hash, cb)
      }, 1000)
    }
  })
}

// var address = "0xf15090c01bec877a122b567e5552504e5fd22b79"
const address = '0xfdfa19c8a971e3203a9989ae878fe42c64451f0a'
const abi = [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fleet",
    "outputs": [
      {
        "name": "numSeats",
        "type": "uint8"
      },
      {
        "name": "price",
        "type": "uint256"
      },
      {
        "name": "reserved",
        "type": "bool"
      },
      {
        "name": "disabled",
        "type": "bool"
      },
      {
        "name": "reservationTime",
        "type": "uint256"
      },
      {
        "name": "reservedTo",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "carId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "driver",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "carReserved",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "component",
        "type": "string"
      }
    ],
    "name": "Anomaly",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "carId",
        "type": "uint256"
      }
    ],
    "name": "NewCar",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "carId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "reservedBy",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "location",
        "type": "string"
      }
    ],
    "name": "ReserveCar",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "carId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "location",
        "type": "string"
      }
    ],
    "name": "ReturnCar",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numSeats",
        "type": "uint8"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "createCar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_component",
        "type": "string"
      }
    ],
    "name": "logAnomaly",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_carId",
        "type": "uint256"
      }
    ],
    "name": "getCar",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_carId",
        "type": "uint256"
      }
    ],
    "name": "removeCar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "hasReserved",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_numSeats",
        "type": "uint8"
      },
      {
        "name": "_maxCost",
        "type": "uint256"
      }
    ],
    "name": "findCar",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_carId",
        "type": "uint256"
      },
      {
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "reserveCar",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_carId",
        "type": "uint256"
      },
      {
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "returnCar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

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

let CarContract

if (typeof (web3) === 'undefined') {
  error('Unable to find web3. ' +
    'Please run MetaMask (or something else that injects web3).')
} else {
  log('Found injected web3.')
  web3 = new Web3(web3.currentProvider)
  log('Connected to test network.')
  CarContract = web3.eth.contract(abi).at(address)
  $('#getcount').click()
}

$('#getcount').click(async (e) => {
  e.preventDefault()
  log('Calling getCount...')
  const res = await promisify(cb => CarContract.owner(cb))
  console.log(res)
})

$('#increment').click(async (e) => {
  e.preventDefault()
  if (web3.eth.defaultAccount === undefined) {
    return error("No accounts found. If you're using MetaMask, " +
        'please unlock it first and reload the page.')
  }
  log('Calling increment...')
  const res = await promisify(cb => CarContract.getCar(0, cb))
  console.log(res)
})

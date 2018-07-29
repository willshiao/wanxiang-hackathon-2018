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

if (abi === undefined) {
  console.error('abi not found')
}

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

  const newCarEvent = CarContract.NewCar()

  newCarEvent.watch(handleNewCarEvent)
}

async function handleNewCarEvent (err, res) {
  if (err) return console.error(err)
  console.log('New Car: ', res)
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

let CarContract

const carDetails = {
  '0': 'Honda Accord',
  '1': 'Toyota Corolla',
  '2': 'Ford Explorer',
  '3': 'Cheverolet Impala',
  '4': 'BMW 330i',
  '5': 'Nissan Altima',
  '6': 'Mazda 3',
  '7': 'Cheverolet Bolt',
  '8': 'Honda CRV',
  '9': 'BMW m3'
}

function populateCarInfo (id) {
  const carId = parseInt(id.toString())
  const cardNum = btoa((carId + 777) * 777).slice(0, 6).toUpperCase()
  const carManufacturer = Number(String(carId).slice(4, 6)) % 9

  $('#out-details').html(`
    <label>Car ID: ${carId}</label>
    </br>
    <label>License Plate: ${cardNum}</label>
    </br>
    <label>Car Model: ${carDetails[carManufacturer]}</label>`)
}

async function hasReserved () {
  return promisify(cb => CarContract.hasReserved(cb))
}

/**
 * Begin blockchain stuff
 */

if (abi === undefined) {
  console.error('abi not found')
}

let reservedCarId = -1

async function showFields () {
  if (await hasReserved()) {
    console.log('Has reserved vehicle')
    $('#return-col').show()
    const carId = await promisify(cb => CarContract.getReserved(cb))
    populateCarInfo(carId)
    reservedCarId = carId
  } else {
    console.log('Don\'t have reserved vehicle')
    $('#book-col').show()
  }
}

if (typeof (web3) === 'undefined') {
  console.error('Unable to find web3. ' +
  'Please run MetaMask (or something else that injects web3).')
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
  CarContract = web3.eth.contract(abi).at(address)
  showFields()
} else {
  web3 = new Web3(web3.currentProvider)
  CarContract = web3.eth.contract(abi).at(address)
  showFields()
}

function handleError (err) {
  Swal({
    title: 'Error',
    text: 'An error occurred: ' + err.message,
    type: 'error'
  })
}

// Return button clicked
$('#return-form').submit(async (evt) => {
  evt.preventDefault()
  try {
    await promisify(cb => CarContract.returnCar(reservedCarId, $('#return-location').val(), cb))

    $('#book-col').show()
    $('#return-col').hide()
    $('#out-details').html('')
    Swal({
      title: 'Success!',
      text: 'Successfully returned ride!',
      type: 'success'
    })
    $('#return-location').val('')
  } catch (e) {
    handleError(e)
  }
})

function createTableRow(data) {
  if (data.args !== undefined) data = data.args
  $('#history-table-body').prepend(`<tr><td>${data.carId}</td><td>${data.location}</td><td>${data.reservedBy}</td></tr>`)
}

$('#history-tab').click(async evt => {
  console.log('Triggered')
  CarContract.ReserveCar({}, { fromBlock: 0, toBlock: 'latest' }).get((err, evtResult) => {
    if (err) console.error(err)
    console.log(evtResult)
    $('#history-table-body').html('')
    evtResult.forEach(createTableRow)
  })
  
  CarContract.ReserveCar().watch((err, result) => {
    if (err) console.error(err)
    console.log('Got event: ', result)
    
    const args = result.args
    createTableRow(args)
  })
})

// Reserve a ride
$('#submit-form').submit(async (evt) => {
  evt.preventDefault()
  try {
    carId = await promisify(cb => CarContract.findCar(2, 1e10, cb))
    console.log('Found free car:', carId.toString())
    const res = await promisify(cb => CarContract.reserveCar(carId, $('#current-location').val(), { value: 10000 }, cb))
    populateCarInfo(carId)
    
    $('#book-col').hide()
    $('#return-col').show()
    Swal({
      title: 'Success!',
      text: 'Successfully reserved ride!',
      type: 'success'
    })
    $('#current-location').val('')
  } catch (e) {
    handleError(e)
  }
})

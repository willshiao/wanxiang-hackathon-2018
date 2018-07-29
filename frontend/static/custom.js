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

  document.getElementById('out-details').innerHTML = `<label>Car Id: ${carId}</label>
    </br>
    <label>Car Num: ${cardNum}</label>
    </br>
    <label>Car Model: ${carDetails[carManufacturer]}</label>`
}

/**
 * Begin blockchain stuff
 */

const address = '0xfdfa19c8a971e3203a9989ae878fe42c64451f0a'

if (abi === undefined) {
  console.error('abi not found')
}

let CarContract

if (typeof (web3) === 'undefined') {
  console.error('Unable to find web3. ' +
    'Please run MetaMask (or something else that injects web3).')
} else {
  web3 = new Web3(web3.currentProvider)
  CarContract = web3.eth.contract(abi).at(address)
}

$('#submit-form').submit(async (evt) => {
  evt.preventDefault()
  const carId = await promisify(cb => CarContract.findCar(2, 1e10, cb))
  console.log('Found free car:', carId.toString())
  const res = await promisify(cb => CarContract.reserveCar(carId, $('#current-location').val(), { value: 10000 }, cb))
  populateCarInfo(carId)
})

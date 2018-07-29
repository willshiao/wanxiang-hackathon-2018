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

$('#submit-form').submit((evt) => {
  evt.preventDefault()
  const carId = Math.floor(4 * Math.random() * 9000000000000000) + 1000000000000000
  const cardNum = btoa(carId * 777).slice(0, 6).toUpperCase()
  const carManufacturer = Number(String(carId).slice(4, 6)) % 9

  document.getElementById('out-details').innerHTML = `<label>Car Id: ${carId}</label>
    </br>
    <label>Car Num: ${cardNum}</label>
    </br>
    <label>Car Model: ${carDetails[carManufacturer]}</label>`
})

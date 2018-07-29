if (typeof (web3) === 'undefined') {
    console.error('Unable to find web3. ' +
      'Please run MetaMask (or something else that injects web3).')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    CarContract = web3.eth.contract(abi).at(address)
  } else {
    web3 = new Web3(web3.currentProvider)
    CarContract = web3.eth.contract(abi).at(address)
  }
  
  $('#traffic-form').submit(async evt => {
    evt.preventDefault()
    await promisify(cb => CarContract.logAnomaly($('#violation-number').val(), cb))
    Swal({
      title: 'Success',
      type: 'success',
      text: 'Successfully registered anomaly'
    })
    $('#violation-number').val('')
  })
  
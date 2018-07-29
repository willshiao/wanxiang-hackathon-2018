if (typeof (web3) === 'undefined') {
  console.error('Unable to find web3. ' +
    'Please run MetaMask (or something else that injects web3).')
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  CarContract = web3.eth.contract(abi).at(address)
} else {
  web3 = new Web3(web3.currentProvider)
  CarContract = web3.eth.contract(abi).at(address)
}

const s = new Set()

async function populateTable () {
  CarContract.Anomaly({}, { fromBlock: 0, toBlock: 'latest' }).get((err, evts) => {
    if (err) console.error(err)
    evts.forEach(evt => s.add(evt.transactionHash))
    const data = evts.map(evt => [evt.args.carId, evt.args.component])
    console.log(data)

    const table = $('#anomaly-table').DataTable({
      data
    })

    CarContract.Anomaly().watch((err, evt) => {
      if (err) console.error(err)
      if (s.has(evt.transactionHash)) {
        console.log('Duplicate event found; ignoring')
        return
      }
      console.log('Got event: ', evt)

      const rowNode = table.row
        .add([ evt.args.carId, evt.args.component ])
        .draw()
        // .node()
      // $(rowNode)
        // .css('color', 'red')
        // .animate({ color: 'black' })
    })
  })
}

populateTable()

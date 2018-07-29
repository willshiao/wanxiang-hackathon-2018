const ctx = document.getElementById('myChart').getContext('2d')

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

async function populateTable() {
  CarContract.Anomaly({}, { fromBlock: 0, toBlock: 'latest' }).get((err, evts) => {
    if (err) console.error(err)
    evts.forEach(evt => s.add(evt.transactionHash))
    const data = evts.map(evt => [evt.args.carId, evt.args.component, new Date(evt.args.time * 1000)])
    console.log(data)

    const table = $('#anomaly-table').DataTable({
      data
    })

    const tableData = table.rows().data()
    const freq = {}

    evts.forEach(evt => {
      const comp = evt.args.component.toLowerCase()
      if (comp in freq) {
        freq[comp]++
      } else {
        freq[comp] = 1
      }
    })
    console.log(freq)

    const pieData = {
      datasets: [{
        data: Object.values(freq),
        backgroundColor: [
          'blue',
          'red',
          'brown',
          'green',
          'orange',
          'yellow',
          'purple'

        ]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: Object.keys(freq)
    }
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: pieData,
      options: {}
    })

    CarContract.Anomaly().watch((err, evt) => {
      if (err) console.error(err)
      if (s.has(evt.transactionHash)) {
        console.log('Duplicate event found; ignoring')
        return
      }
      console.log('Got event: ', evt)

      const rowNode = table.row
        .add([evt.args.carId, evt.args.component, new Date(parseInt(evt.args.time.toString()) * 1000)])
        .draw()

      // .node()
      // $(rowNode)
      // .css('color', 'red')
      // .animate({ color: 'black' })
    })
  })
}

populateTable()

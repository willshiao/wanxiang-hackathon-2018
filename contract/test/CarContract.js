const CarContract = artifacts.require('./CarContract.sol')

async function addCars (instance) {
  await instance.createCar(1, 100)
  await instance.createCar(2, 200)
  await instance.createCar(4, 400)
}

contract('CarContract', function (accounts) {
  it('should allow the owner to add cars w/ different seats', async function () {
    const instance = await CarContract.deployed()
    await addCars(instance)
  })

  it('should allow the owner to remove cars', async function () {
    const instance = await CarContract.deployed()
    await instance.createCar(1, 100)
    await instance.removeCar(0)
  })

  it('should allow a user to get cars', async function () {
    const instance = await CarContract.deployed()
    await instance.createCar(1, 100)
    const res = await instance.getCar(0)
    assert.equal(res[0], 1)
    assert.equal(res[1], 100)
    assert.equal(res[2], false)
    assert.equal(res[3], false)
  })

  it('should allow a user to reserve cars', async function () {
    const instance = await CarContract.deployed()
    await addCars(instance)

    await instance.reserveCar(1)
  })

  // it('should put 10000 CarContract in the first account', function () {
  //   return CarContract.deployed().then(function (instance) {
  //     return instance.getBalance.call(accounts[0])
  //   }).then(function (balance) {
  //     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account")
  //   })
  // })
  // it('should call a function that depends on a linked library', function () {
  //   var meta
  //   var metaCoinBalance
  //   var metaCoinEthBalance

  //   return CarContract.deployed().then(function (instance) {
  //     meta = instance
  //     return meta.getBalance.call(accounts[0])
  //   }).then(function (outCoinBalance) {
  //     metaCoinBalance = outCoinBalance.toNumber()
  //     return meta.getBalanceInEth.call(accounts[0])
  //   }).then(function (outCoinBalanceEth) {
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber()
  //   }).then(function () {
  //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken')
  //   })
  // })
  // it('should send coin correctly', function () {
  //   var meta

  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0]
  //   var account_two = accounts[1]

  //   var account_one_starting_balance
  //   var account_two_starting_balance
  //   var account_one_ending_balance
  //   var account_two_ending_balance

  //   var amount = 10

  //   return CarContract.deployed().then(function (instance) {
  //     meta = instance
  //     return meta.getBalance.call(account_one)
  //   }).then(function (balance) {
  //     account_one_starting_balance = balance.toNumber()
  //     return meta.getBalance.call(account_two)
  //   }).then(function (balance) {
  //     account_two_starting_balance = balance.toNumber()
  //     return meta.sendCoin(account_two, amount, { from: account_one })
  //   }).then(function () {
  //     return meta.getBalance.call(account_one)
  //   }).then(function (balance) {
  //     account_one_ending_balance = balance.toNumber()
  //     return meta.getBalance.call(account_two)
  //   }).then(function (balance) {
  //     account_two_ending_balance = balance.toNumber()

  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender")
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver")
  //   })
  // })
})

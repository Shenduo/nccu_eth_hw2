const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(function (accounts) {

    // deploy contract
    // your code
    console.log(accounts);

    bank.deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: 4000000,
      gasPrice: '3000000'
    })
    .then((instance) =>{
      console.log(`Adress: ${instance.options.address}`);
      fs.writeFileSync('./address.txt', `${instance.options.address}`);

    });
})

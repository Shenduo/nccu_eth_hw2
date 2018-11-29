const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] transferOwner to accounts[1]
    bank.methods.transferOwner(accounts[1]).send({from: accounts[0]}).then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        console.log(receipt)
    });
    // your code

})

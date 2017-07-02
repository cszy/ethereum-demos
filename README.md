## Introduction
 
The goal of this example project is to explore use cases of the **Ethereum blockchain** by building example **DApps** (decentralized applications).
 
DApps allow **smart contracts** (digital agreements between parties) to be executed on the **EVM** (Ethereum Virtual Machine), the Turing-complete runtime that powers the Ethereum blockchain.
 
The ledger of activities provided by the blockchain, paired with smart contracts, enable a wide range of potential use cases. For example, writing code that fulfills code quality, testing, peer review, and version control standards specified in a smart contract could trigger other events, like the release of “points” from an underlying user story and automation (build/deploy) events. The blockchain would effectively serve as the backbone for all events related to a unit of functionality, holding an immutable record of software development, testing, and CI/CD activities.
 
These examples are designed to spark ideas around blockchain and DApps.
 
## Example 1 - TestRPC Via Command Line
 
Install testrpc, a Node-based Ethereum client (effectively, a simulated blockchain).
`> npm install -g ethereumjs-testrpc`
 
Install web3, the Ethereum Javascript API.
`> npm install -g web3`
 
Install Solidity (the main programming language that runs on the EVM) compiler.
`> npm install -g solc`
 
`> testrpc`
 
You’ll see addresses for 10 test accounts, as well as the information that this is running on localhost:8545.
 
Get an example smart contract [TODO] and save it as example.sol.

This example smart contract allows us to conduct a poll, where users can vote for their favorite cryptocurrency.
 
Now, we’ll compile this contract and deploy it to the example blockchain.
 
`> node`
 
`> Web3 = require('web3')`
 
`> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));`
 
`> code = fs.readFileSync('example.sol').toString()`
 
`> solc = require('solc')`
 
`> compiledCode = solc.compile(code)`
 
`> compiledCode`
 
You’ll see the output of your compiled code. We’re most interested in the **bytecode** and the **interface** (also called the **ABI**).

`> abiDefinition = JSON.parse(compiledCode.contracts[':Example'].interface)`
 
`> ExampleContract = web3.eth.contract(abiDefinition)`
 
`> byteCode = compiledCode.contracts[':Example'].bytecode`
 
The contract is now ready to be deployed to the example TestRPC blockchain.
 
Ether from the account specified in the “from” will pay the **gas** required for miners to execute the contract.
`> deployedContract = ExampleContract.new(['Bitcoin','Ether','Litecoin'],{data: byteCode, from: web3.eth.accounts[0], gas: 5000000})`

`> contractInstance = ExampleContract.at(deployedContract.address)`
 
Check how many votes Ether has.
`> contractInstance.totalCountFor.call('Ether')`
 
Vote for Ether. To vote from another account, use web3.eth.accounts[1], and so on.
`> contractInstance.voteForToken('Ether', {from: web3.eth.accounts[0]})`
 
Now see the total votes for Ether.
`> contractInstance.totalVotesFor.call(‘Ether’).toLocaleString()`
 
## Example 2 - TestRPC Via Browser



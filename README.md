## Introduction
 
The goal of this example project is to explore use cases of the **Ethereum blockchain** by building example **DApps** (decentralized applications).
 
DApps allow **smart contracts** (digital agreements between parties) to be executed on the **EVM** (Ethereum Virtual Machine), the Turing-complete runtime that powers the Ethereum blockchain.
 
The ledger of activities provided by the blockchain, paired with smart contracts, enable a wide range of potential use cases. For example, writing code that fulfills code quality, testing, peer review, and version control standards specified in a smart contract could trigger other events, like the release of “points” from an underlying user story and automation (build/deploy) events. The blockchain would effectively serve as the backbone for all events related to a unit of functionality, holding an immutable record of software development, testing, and CI/CD activities.
 
These examples are designed to spark ideas around blockchain and DApps.

References: https://www.amazon.com/Introducing-Ethereum-Solidity-Foundations-Cryptocurrency/dp/1484225341/, https://medium.com/@mvmurthy/ethereum-for-web-developers-890be23d1d0c, https://blockgeeks.com/guides/how-to-learn-solidity/, https://www.ethereum.org/token
 
## Example 1 - TestRPC Via Command Line
 
Install **TestRPC**, a Node-based Ethereum client (effectively a simulated blockchain).

We'll do this directly through Node and Javascript for now, which will ensure that all core concepts are covered. In the next example, we'll move to something that is more abstracted and easier to use.

`$ npm install -g ethereumjs-testrpc`
 
Install **web3.js**, the Ethereum Javascript API.

`$ npm install -g web3`
 
Install the **Solidity compiler** (**Solidity** is the most popular programming language that runs on the EVM).

`$ npm install -g solc`

From your terminal, run:
 
`$ testrpc`
 
You’ll see addresses for 10 test accounts, as well as the information that this is running on localhost:8545.
 
Save this example smart contract, which is written in Solidity: https://github.com/cszy/ethereum-examples/blob/master/exampleTestRPCWeb/example.sol

This smart contract is for a poll, where users can vote for their favorite cryptocurrency.
 
Now, we’ll compile this contract and deploy it to the example blockchain.

From another terminal window:
 
`$ node`
 
`> Web3 = require('web3');`
 
`> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));`
 
`> code = fs.readFileSync('example.sol').toString();`
 
`> solc = require('solc');`
 
`> compiledCode = solc.compile(code);`
 
You’ll see the output of your compiled code. We’re most interested in the **bytecode** and the **interface** (also called the **ABI**).

`> abiDefinition = JSON.parse(compiledCode.contracts[':Example'].interface);`
 
`> ExampleContract = web3.eth.contract(abiDefinition);`
 
`> byteCode = compiledCode.contracts[':Example'].bytecode;`
 
The contract is now ready to be deployed to the example TestRPC blockchain.
 
Ether from the account specified in the “from” will pay the **gas** required for miners to execute the contract.

`> deployedContract = ExampleContract.new(['Bitcoin','Ether','Litecoin'],{data: byteCode, from: web3.eth.accounts[0], gas: 4000000});`

`> contractInstance = ExampleContract.at(deployedContract.address);`
 
Check how many votes Ether has.

`> contractInstance.totalVotesByToken.call('Ether').toLocaleString();`
 
Vote for Ether. To vote from another account, use web3.eth.accounts[1], and so on.

`> contractInstance.castVote('Ether', {from: web3.eth.accounts[0]});`
 
Now see the total votes for Ether.

`> contractInstance.totalVotesByToken.call('Ether').toLocaleString();`
 
## Example 2 - TestRPC Via Browser

Next, we can interact with this contract in a web browser:

Save these files:

https://github.com/cszy/ethereum-examples/blob/master/exampleTestRPCWeb/index.html

https://github.com/cszy/ethereum-examples/blob/master/exampleTestRPCWeb/index.js

In your Node console, run:

`> contractInstance.address`

In index.js, replace the value here:

exampleContractInstance = ExampleContract.at('0x6c9567db46d04429665747e50dca076743a941ab2');

With the result of `contractInstance.address`.

## Example 3 - TestRPC Via Truffle

**Truffle** is a popular development framework for Ethereum billed as "a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier".

We'll alter our code from Example 2 to use Truffle.

To begin, install the necessary dependencies:

`$ brew tap ethereum/ethereum`

`$ brew install ethereum`
 
`$ npm install -g truffle`

`$ npm install -g truffle-expect`

`$ npm install -g truffle-config`

`$ npm install -g web3`
 
`$ npm install -g webpack`

Also, ensure that you're on a recent version of Node. For example:

`$ nvm install 6.11.0`

From the directory that you want to use for your project:

`$ truffle init webpack`
 
Truffle will be initialized with boilerplate code. Overview of the directories that were created:

`/app` contains the core application code. Update the following files:

`app.js` should contain this code:
https://github.com/cszy/ethereum-examples/blob/master/exampleTruffle/app/javascripts/app.js

`index.html` should contain this code:
https://github.com/cszy/ethereum-examples/blob/master/exampleTruffle/app/index.html

`/contracts` are where we'll put our Solidity contracts. You'll see three contracts: `ConvertLib.sol`, `MetaCoin.sol`, and `Migrations.sol`. We'll need `Migrations.sol` (explained below), but feel free to delete the others.

Add another contract to this folder called `example.sol`, which contains this code:
https://github.com/cszy/ethereum-examples/blob/master/exampleTruffle/contracts/example.sol

`/migrations` contains Javascript files that govern the deployment contracts to the blockchain. This starts with 1_initial_migration.js, which deploys the Migrations.sol contract.

Migrations.sol serves as a default contract that sits on the blockchain, containing the latest version of the contract(s) that you've deployed. Rather than re-deploying your contract from scratch every time there is a change, Truffle allows contracts to evolve over time via migrations, similar to a database.

`2_deploy_contracts.js` is used to migrate our example.sol contract onto the blockchain. It should contain this code:
https://github.com/cszy/ethereum-examples/blob/master/exampleTruffle/migrations/2_deploy_contracts.js

If you are running Ethereum Wallet, TestRPC, or Metamask stop them now.

Start TestRPC again:

`$ testrpc`

In a new terminal window run:
 
`$ truffle compile --all`

A build folder will be created and you'll see a confirmation that the project compiled:

`Writing artifacts to ./build/contracts`

`$ truffle migrate --reset`

Your contract will be deployed to the network and you'll see a confirmation:

`Deploying Example...
  Example: 0x981f327df660daac798c2e2eaf0af8edc4ec2d02
Saving successful migration to network...
Saving artifacts...`

Finally, the project is ready to be run in a web browser. Run:

`npm run dev`

You'll see a confirmation:

`Project is running at http://localhost:8080/`

Visit this URL and you'll be able to interact with your contract.
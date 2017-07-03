web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"token","type":"bytes32"}],"name":"castVote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"bytes32"}],"name":"totalVotesByToken","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"totalVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"bytes32"}],"name":"tokenValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"tokenNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]');

ExampleContract = web3.eth.contract(abi);

// Replace this with the value from your Node console > contractInstance.address
exampleContractInstance = ExampleContract.at('0x6c9567db46d04429665747e50dca076743a941ab2');

var tokens = document.querySelectorAll(".token");

tokens.forEach(function(token){
    let tokenName = token.querySelectorAll(".token-name")[0].innerHTML;
    let contractVotes = exampleContractInstance.totalVotesByToken.call(tokenName).toString();

    token.querySelectorAll(".token-votes")[0].innerHTML = contractVotes;
});

function castVote(element) {
    let voteItem = element.getAttribute("data-id");
    let voteToken = document.getElementById("token-" + voteItem);
    let voteTokenName = voteToken.querySelectorAll(".token-name")[0].innerHTML;

    exampleContractInstance.castVote(voteTokenName, {from: web3.eth.accounts[0]}, function() {
        let updatedVotes = exampleContractInstance.totalVotesByToken.call(voteTokenName).toString();

        voteToken.querySelectorAll(".token-votes")[0].innerHTML = updatedVotes;
    });
}
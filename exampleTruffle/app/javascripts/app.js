import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import example_artifacts from '../../build/contracts/Example.json'

var Example = contract(example_artifacts);

window.App = {
    start: function() {
        var self = this;

        Example.setProvider(web3.currentProvider);

        var tokens = document.querySelectorAll(".token");

        tokens.forEach(function(token){
            let tokenName = token.querySelectorAll(".token-name")[0].innerHTML;
            let contractVotes = '';

            /*
             * From `truffle console`, run this first to confirm that things are working
             * Example.deployed().then(function(contractInstance) {contractInstance.totalVotesByToken('Ether').then(function(v) {console.log(v)})})
             */
            Example.deployed().then(function(contractInstance) {
                contractVotes = contractInstance.totalVotesByToken.call(tokenName).then(function(v) {
                    token.querySelectorAll(".token-votes")[0].innerHTML = v.toString();
                });
            });
        });
    },

    castVote: function(element) {
        let voteItem = element.getAttribute("data-id");
        let voteToken = document.getElementById("token-" + voteItem);
        let voteTokenName = voteToken.querySelectorAll(".token-name")[0].innerHTML;
        let updatedVotes = '';

        try {
            // Example.deployed() returns an instance of the contract
            Example.deployed().then(function(contractInstance) {
                
                /*
                 * From `truffle console`, run this first to confirm that things are working
                 * Example.deployed().then(function(contractInstance) {contractInstance.castVote('Ether', {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {console.log(v)})})
                 */
                contractInstance.castVote(voteTokenName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
                    updatedVotes = contractInstance.totalVotesByToken.call(voteTokenName).then(function(v) {
                        voteToken.querySelectorAll(".token-votes")[0].innerHTML = v.toString();
                    });
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    App.start();
});
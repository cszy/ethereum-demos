var Example = artifacts.require("./example.sol");

module.exports = function(deployer) {
	deployer.deploy(Example, ['Bitcoin', 'Ether', 'Litecoin'], {gas: 300000});
};
pragma solidity ^0.4.11;

contract Example {
    mapping (bytes32 => uint8) public totalVotes;
    bytes32[] public tokenList;

    function Example(bytes32[] tokenNames) {
        tokenList = tokenNames;
    }

    function totalVotesByToken(bytes32 token) returns (uint8) {
        if (tokenValidator(token) == false) {
            throw;
        }
        return totalVotes[token];
    }

    function castVote(bytes32 token) {
        if (tokenValidator(token) == false) {
            throw;
        }
        totalVotes[token] += 1;
    }

    function tokenValidator(bytes32 token) returns (bool) {
        for(uint i = 0; i < tokenList.length; i++) {
            if (tokenList[i] == token) {
                return true;
            }
        }
        return false;
    }
}

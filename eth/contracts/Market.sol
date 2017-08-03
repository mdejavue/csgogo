pragma solidity ^0.4.15

contract Market {

    address public owner;
    modifier onlyOwner() {
		if (msg.sender != owner) throw;
		_;
	}

    // keeps book about exact conditions
    struct Condition {
        bool mustBeWinner,
        uint minPosition,
        uint minKills,
        uint minMVPs,
        uint minScore
    }

    // prevents double-claiming
    struct Claim {
        string matchId,
        string playerId
    }

    struct Offer {
        address creator,
        uint budget,
        uint payout,
        string nick,
        Condition condition,
        Claim[] claims
    }

    mapping public (bytes32 => Offer) offers;

    function Market() {
        owner = msg.sender;
    }

    function createOffer(uint budget, uint payout, string nick, bool mustBeWinner, uint minPosition, uint minKills, uint minMVPs, uint minScore) payable returns (bytes32 key) {
        // TODO: validate inputs
        Condition condition = Condition(mustBeWinner, minPosition, minKills, minMVPs, minScore);
        Offer offer = Offer(msg.sender, budget, payout, nick, condition, []);

        bytes32 key = sha256(offer);
        offers[key] = offer;
        return key;
    }

    function claim(bytes32 key, string matchId, string playerId, address payoutAddress) onlyOwner {
        // function expects that the condition has been checked by owners backend

        Offer offer = offers[key];
        if (offer.payout > offer.budget) {
            throw;
        }

        Claim[] claims = offer.claims;
        for (uint i = 0; i < claims.length; i++) {
            if (claims[i].matchId == matchId && claims[i].playerId == playerId) {
                throw;
            }
        }

        offer.budget -= offer.payout;
        payoutAddress.send(offer.payout);
    }
}
pragma solidity ^0.4.14;

contract Market {

	uint constant MIN_BUDGET = 100000000000000000 wei; // 0.1 ether
    uint constant MIN_PAYOUT = 1000000000000000 wei; // 0.001 ether

    uint offerCount;
    address owner;
    modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

    // keeps book about exact conditions
    struct Condition {
        bool mustBeWinner;
        uint8 minPosition;
        uint8 minKills;
        uint8 minMVPs;
        uint8 minScore;
    }

    struct Offer {
        address creator;
        uint budget;
        uint payout;
        bytes32 nick;
        Condition condition;
    }

    mapping (bytes32 => uint) claims;
    mapping (uint => Offer) offers;

    function Market() {
        owner = msg.sender;
        offerCount = 1;
    }

    function createOffer(uint payout, bytes32 nick, bool mustBeWinner, uint8 minPosition, uint8 minKills, uint8 minMVPs, uint8 minScore) payable returns (uint key) {
        // TODO: validate inputs
        payout = payout * 10000 wei;
		require(msg.value >= MIN_BUDGET && payout >= MIN_PAYOUT && msg.value % payout == 0);

        Condition memory condition = Condition(mustBeWinner, minPosition, minKills, minMVPs, minScore);
        Offer memory offer = Offer(msg.sender, msg.value, payout, nick, condition);
        offers[offerCount] = offer;
        key = offerCount;
        offerCount++;
    }

    function _claimSingle(uint key, bytes32 claimShaId) onlyOwner private returns(uint payout) {
        // function expects that the condition has been checked by owners backend

        Offer memory offer = offers[key];
        require(offer.budget > 0 && offer.budget >= offer.payout && claims[claimShaId] != key);

        offer.budget -= offer.payout;
        claims[claimShaId] = key;
        payout = offer.payout;
    }

    function claimBatch(uint[] keys, bytes32[] claimShaIds, address payoutAddress) onlyOwner {
        uint payoutSum = 0;
        for (uint i = 0; i < keys.length; i++) {
            payoutSum += _claimSingle(keys[i], claimShaIds[i]);
        }

        payoutAddress.transfer(payoutSum);
    }

    function getOffer(uint key) constant returns (address creator, uint budget, uint payout, bytes32 nick, bool mustBeWinner, uint8 minPosition, uint8 minKills, uint8 minMVPs, uint8 minScore) {
        Offer memory offer = offers[key];
        creator = offer.creator;
        budget = offer.budget;
        payout = offer.payout;
        nick = offer.nick;

        Condition memory condition = offer.condition;
        mustBeWinner = condition.mustBeWinner;
        minPosition = condition.minPosition;
        minKills = condition.minKills;
        minMVPs = condition.minMVPs;
        minScore = condition.minScore;
    }
}
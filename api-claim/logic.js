'use strict';

const express = require('express');
const request = require('request');

module.exports = function (config) {

    

    const matchRepository = config.matchRepository;
    const app = express();

    app.get('/', function (req, res) {
        res.status(200).send('claim api v0.1');
    });

    app.get('/erasedb', function(req, res) {
        matchRepository.deleteAll();
        res.status(200).send('db erased');
    });

    app.get('/check/:matchId/:playerId', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        // decrypt playerId
        const playerId = "76561198140305418"; //req.params.playerId;
        const matchId = req.params.matchId;


        // first check if this match is already in postgres with status open or closed
        matchRepository.findMatch(matchId, playerId).then(matchResult => {
            if (matchResult && matchResult.claimed) {
                res.status(200).send("already in Database and already claimed");
            } else if (matchResult && !matchResult.claimed) {
                res.status(200).send("already eligable to claim");
            } else {
                // submit match to mm-api and collect result for player
                request('http://localhost:3001/match/' + matchId, function (error, response, body) {

                    const aMatchResult = JSON.parse(body);
                    const oPlayerResult = aMatchResult.find(m => {
                        return m.id === playerId;
                    });

                    // web3:
                    // check if playerId had a nickname that fulfills one of an open Offer
                    // check if conditions of this offer are met

                    // postgres
                    // if conditions met, add to database with status open
                    matchRepository.addMatchResult({ matchId: matchId, playerId : playerId, claimed : false });

                    // return result
                    res.status(200).send("I got: " + matchId + "/" + playerId + "and playerResult: " + JSON.stringify(oPlayerResult));
                });
            }
        });
    });

    app.get('/claim/finalize', function (req, res) {

        // read open matches from database
        // call claimBatch on Contract
        // set status claimed in database or flush queue ? maybe history is appreciated

        // return result
        res.status(200).send("all goood for ya batch");
    });

    return app;
};
'use strict';

const express = require('express');
const request = require('request');

module.exports = function () {

    const app = express();

    app.get('/', function (req, res) {
         res.status(200).send('claim api v0.1');
    });    

    app.get('/check/:matchId/:playerId', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        // decrypt playerId
        const playerId = req.params.playerId;
        const matchId = req.params.matchId;


        // submit match to mm-api
        // collect result
         request('http://localhost:3001/match/' + matchId, function(error, response, body) {
            res.status(200).send("I got: " + matchId + "/" + playerId + "and matchData: " + body);
        });



        // web3:
        // check if playerId had a nickname that fulfills one of an open Offer
        // check if conditions of this offer are met

        // postgres
        // if conditions met, add to database with status open

        // return result
        
    });

    app.get('/claim/:matchIds', function (req, res) {

        // read open matches from database
        // call claimBatch on Contract
        // set status claimed in database

        // return result
        res.status(200).send("all goood for ya batch");
    });

    return app;
};
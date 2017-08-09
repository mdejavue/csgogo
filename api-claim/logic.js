'use strict';

const express = require('express');

module.exports = function () {

    const app = express();

    app.get('/', function (req, res) {
         res.status(200).send('claim api v0.1');
    });    

    app.get('/check/:matchId', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        // submit match to mm-api
        // collect result
        // check if playerId had a nickname that fulfills one of an open Offer
        // check if conditions of this offer are met
        // if conditions met, add to database with status open

        // return result
        res.status(200).send("all goood for ya");
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
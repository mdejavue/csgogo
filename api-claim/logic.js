'use strict';

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const SteamStrategy = require('passport-steam').Strategy;


module.exports = function () {

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }

    const app = express();


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new SteamStrategy({
        returnURL: 'http://192.168.157.131:3001/auth/return',
        realm: 'http://192.168.157.131:3001/',
        profile: false
    },
        function (identifier, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // TODO:
                // check if in the uploaded game the user participated under offer conditions
                // send the payout if conditions are met
                // mark match on blacklist to prevent double spending

                return done(null, identifier);
            });
        }
    ));

    app.use(session({
        secret: 'your secret',
        name: 'name of session id',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', function (req, res) {
         res.status(200).send('claim api v0.1');
    });

    app.get('/account', ensureAuthenticated, function (req, res) {
         res.status(200).send(req.user);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth',
        passport.authenticate('steam', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/');
    });

    app.get('/auth/return',
        passport.authenticate('steam', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/');
    });

    app.get('/check/:matchId', ensureAuthenticated, function (req, res) {

        // submit match to mm-api
        // collect result
        // check against Contract conditions and playerId
        // if conditions met, add to database with status open

        // return result
        res.status(200).send(req.user);
    });

    app.get('/claim/:matchIds', ensureAuthenticated, function (req, res) {

        // read open matches from database
        // call claimBatch on Contract

        // return result
        res.status(200).send(req.user);
    });

    return app;
};
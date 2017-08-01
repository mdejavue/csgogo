'use strict';

const express = require('express');
const request = require('request');
const parse5 = require('parse5');

module.exports = function () {

    function createRichJSON(aPlayers) {
        return aPlayers.map(p => {
            let i = 0;
            let t = p.texts;
            return {
                name : t[i++],
                team : t.length > 10 ? t[i++].substr(1) : "",
                kills : t[i++],
                assists : t[i++],
                deaths : t[i++],
                ratio : t[i++],
                kd : t[i++],
                kr : t[i++],
                mvps : t[i++],
                aces : t[i++],
                score : t[i]
            };
        })
    };

    const app = express();
    app.get('/', function (req, res, next) {
        res.status(200).send('api v0.1');
    });

    app.get('/match/:id', function (req, res, next) {
        const matchId = req.params.id;
        const parser = new parse5.SAXParser();
        let aPlayers = [];

        parser.on('startTag', (name, attrs) => {
            if (name === "td") {
                let isPlayer = attrs.find(attr => {
                    return attr.name === "width" && attr.value === "300";
                });

                if (isPlayer) {
                    aPlayers.push({
                        texts : []
                    })
                }
            }
        });

        parser.on('text', (text) => {
            if (aPlayers.length > 0) {
                let currPlayer = aPlayers[aPlayers.length -1];
                if (text !== '\n' && currPlayer.texts.length <= 11) {
                    currPlayer.texts.push(text);
                }

                if (aPlayers.length === 10 && currPlayer.texts.length >= 11) {
                    parser.stop();

                    let richJSON = createRichJSON(aPlayers);                    
                    res.status(200).send(JSON.stringify(richJSON));
                }
            }

        });

        request.get('http://www.csgo-stats.net/match/' + matchId).pipe(parser);        
    });

    return app;
};
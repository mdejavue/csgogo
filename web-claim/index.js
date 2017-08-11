const express = require('express');
const request = require('request');
const passport = require('passport');
const session = require('express-session');
const SteamStrategy = require('passport-steam').Strategy;

const app = express();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/noAuth');
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


passport.use(new SteamStrategy({
  returnURL: 'http://192.168.157.131:8000/auth/return',
  realm: 'http://192.168.157.131:8000/',
  profile: false
},
  function (identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

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

app.get('/check/:id', ensureAuthenticated, function (req, res) {
  const matchId = req.params.id;
  const playerId = req.user.split("/openid/id/")[1];
  // TODO: encrypt req.user with private key or make it safe anyhow
  request('http://localhost:3000/check/' + matchId + "/" + playerId, function(error, response, body) {
      res.status(200).send(body);
  });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/noAuth');
});

app.get('/noAuth', function (req, res) {
    res.sendFile(__dirname + '/noAuth.html');
});

app.get('/auth',
  passport.authenticate('steam', { failureRedirect: '/noAuth' }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/auth/return',
  passport.authenticate('steam', { failureRedirect: '/noAuth' }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/', ensureAuthenticated, function (req, res) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + "/"));

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
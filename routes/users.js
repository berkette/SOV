var express = require('express');
var passport = require('passport');
var Summoner = require('../models.js').Summoner;
var router = express.Router();

router.post('/login', passport.authenticate('local'), 
function (req, res, next) {
    res.redirect("/users/status")
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json("Logged out")
});

router.get('/status', function (req, res, next) {
    if (req.user) {
        res.json(req.user)
    } else {
        res.json("Not logged in")
    }
});

router.post('/create', function (req, res, next) {
    if (req.body.password != req.body.passwordagain) {
        var error = new Error("Passwords don't match")
        error.status = 401
        return next(error)
    }

    if (["Human", "Demon", "Angel", "Ghoul"].indexOf(req.body.race) == -1) {
        var error = new Error("Invalid race")
        error.status = 401
        return next(error)
    }

    var summoner = new Summoner({
        "username": req.body.username,
        "race": req.body.race,
    });

    if (req.body.race == "Human") summoner.stats = {"ATK": 0, "DEF": 4, "MAG": 1, "RES": 1}
    if (req.body.race == "Demon") summoner.stats = {"ATK": 4, "DEF": 1, "MAG": 1, "RES": 1}
    if (req.body.race == "Angel") summoner.stats = {"ATK": 1, "DEF": 1, "MAG": 4, "RES": 1}
    if (req.body.race == "Ghoul") summoner.stats = {"ATK": 1, "DEF": 1, "MAG": 1, "RES": 4}

    // TODO: check uniqueness or something

    Summoner.register(summoner, req.body.password,
    function(err, summoner) {
        if (err) return next(err)

        passport.authenticate('local')(req, res, function () {
            res.json("Created user")
            //res.redirect('/');
        });
    });
});


module.exports = router;

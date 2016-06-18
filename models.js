var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Summoner = new Schema({
    username: String,
    password: String,
    race: String,
    stats: {
        ATK: Number,
        DEF: Number,
        MAG: Number,
        RES: Number
    }
});

Summoner.plugin(passportLocalMongoose);

module.exports = {
    Summoner: mongoose.model('Summoner', Summoner)
}


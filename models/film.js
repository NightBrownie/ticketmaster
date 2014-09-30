(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');

    var filmSchema = mongoose.Schema({
        name: {type: String, required: true},
        mainImageUrl: {type: String, required: true},
        frameUrls: {type: [String], required: true},
        country: {type: String},
        year: {type: Number}, //TODO: add min and max as value from config
        length: { //TODO: set custom validation for values
            type: {
                hours: {type: Number},
                minutes: {type: Number},
                seconds: {type: Number}
            },
            required: true
        },
        genre: {type: String, required: true},
        director: {type: String},
        mainActors: {type: [String], required: true},
        ageRestriction: {type: Number, required: true, default: 3} //set from the config
    });

    //validators
    //film name should not match /^\s*$/ regexp (empty spaces)

    module.exports = mongoose.model('Film', filmSchema);
})(module);
(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');

    var genericValidators = require('../modules/validation/genericValidators');

    var filmSchema = mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        mainImageUrl: {type: String, required: true},
        frameUrls: {type: [String]},
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
        genre: {type: String},
        director: {type: String},
        mainActors: {type: [String]},
        ageRestriction: {type: Number, required: true, default: 3} //set from the config
    });

    //validators
    filmSchema.path('mainImageUrl').validate(genericValidators.validateUrl, 'Invalid main image Url');
    filmSchema.path('name').validate(genericValidators.validatePlainText, 'Invalid name');
    filmSchema.path('genre').validate(genericValidators.validatePlainText, 'Invalid genre');
    filmSchema.path('director').validate(genericValidators.validatePlainText, 'Invalid director');
    filmSchema.path('mainActors').validate(genericValidators.validatePlainText, 'Invalid actor name');
    filmSchema.path('frameUrls').validate(genericValidators.validateUrl, 'Invalid frame url');

    module.exports = mongoose.model('Film', filmSchema);
})(module);
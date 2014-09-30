(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var eventSchema = mongoose.Schema({
        date: {type: Date, required: true, default: Date.now},
        filmId: {type: ObjectId, required: true},
        theaterId: {type: ObjectId, required: true},
        hallId: {type: ObjectId, required: true}
    });

    //validators

    module.exports = mongoose.model('Event', eventSchema);
})(module);
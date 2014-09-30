(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var commentSchema = mongoose.Schema({
        filmId: {type: ObjectId, required: true},
        userId: {type: ObjectId, required: true},
        date: {type: Date, required: true, default: Date.now},
        text: {type: String, required: true}
    });

    module.exports = mongoose.model('Comment', commentSchema);
})(module);
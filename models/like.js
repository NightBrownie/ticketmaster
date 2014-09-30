(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');
    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    var likeSchema = mongoose.Schema({
        filmId: {type: ObjectId, required: true},
        userId: {type: ObjectId, required: true},
        isPositive: {type: Boolean, required: true, default: false},
        isChanged: {type: Boolean, required: true, default: false}
    });

    module.exports = mongoose.model('Like', likeSchema);
})(module);
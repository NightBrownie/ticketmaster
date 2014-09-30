(function(module, undefined) {
    'use strict';

    var mongoose = required('../config/mongooseConfig');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var ticketSchema = mongoose.Schema({
        eventId: {type: ObjectId, required: true},
        userId: {type: ObjectId, required: true},
        isApproved: {type: Boolean, required: true, default: false},
        place: {
            type: {
                rowNumber: {type: Number, required: true},
                seatNumber: {type: Number, required: true}
            },
            required: true
        }
    });

    module.exports = mongoose.model('Ticket', ticketSchema);
})(module);
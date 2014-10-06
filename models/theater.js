(function(module, undefined) {
    'use strict';
    
    var mongoose = require('../config/mongooseConfig');
    
    var theaterSchema = mongoose.Schema({
        name: {type: String, required: true},
        mainImageUrl: {type: String, required: true},
        description: {type: String, required: false},
        subwayStationName: {type: String},
        onlineBookingSupported: {type: Boolean, required: true, default: false},
        terminalPaymentSupported: {type: Boolean, required: true, default: false},
        qrCodeReaderSupported: {type: Boolean, required: true, default: false},
        barAllowed: {type: Boolean, required: true, default: false},
        parkingAllowed: {type: Boolean, required: true, default: false},
        address: {
            required: true,
            type: {
                city: {type: String, required: true},
                street: {type: String, required: true},
                houseNumb: {type: String, required: true}
            }
        },
        phoneNumber: {type: String},
        photos: {
            type: [String]
        },
        halls: {
            type: [{
                name: {
                    type: String,
                    required: true
                },
                rows: {
                    type: [{
                        seatsCount: {type: Number, required: true},
                        rowNumber: {type: Number, required: true}
                    }],
                    required: true
                }
            }],
            required: true
        }
    });
    
    module.exports = mongoose.model('Theater', theaterSchema);
})(module);
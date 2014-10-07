(function(module, undefined) {
    'use strict';
    
    var mongoose = require('../config/mongooseConfig');

    var genericValidators = require('../modules/validation/genericValidators');

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

    //validators
    theaterSchema.path('mainImageUrl').validate(genericValidators.validateUrl, 'Invalid main image Url');
    theaterSchema.path('name').validate(genericValidators.validatePlainText, 'Invalid name');
    theaterSchema.path('subwayStationName').validate(genericValidators.validatePlainText, 'Invalid subway station name');
    theaterSchema.path('phoneNumber').validate(genericValidators.validatePhoneNumber, 'Invalid phone number');
    theaterSchema.path('address.city').validate(genericValidators.validatePlainText, 'Invalid address city');
    theaterSchema.path('address.street').validate(genericValidators.validatePlainText, 'Invalid address street');
    theaterSchema.path('address.houseNumb').validate(genericValidators.validatePlainText, 'Invalid address house number');
    theaterSchema.path('halls.name').validate(genericValidators.validatePlainText, 'Invalid hall name');
    theaterSchema.path('photos').validate(genericValidators.validateUrl, 'Invalid photo url');

    module.exports = mongoose.model('Theater', theaterSchema);
})(module);
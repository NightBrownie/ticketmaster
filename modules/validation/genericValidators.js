(function(module, undefined) {
    'use strict';

    module.exports = {
        validateUrl: function(value) {
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
        },
        validatePlainText: function(value) {
            return /^.{1,50}$/.test(value);
        },
        validatePhoneNumber: function(value) {
            return new RegExp('^\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d'
            +'|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$').test(value);
        },
        validateRowSeatsCount: function(value) {
            return /^\d{1,3}$/.test(value);
        }
    };
})(module);

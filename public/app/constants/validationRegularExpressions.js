(function(window, undefined) {
    'use strict';

    angular.module('constants')
        .constant('validationRegularExpressions', {
                username: /^[A-Za-z0-9_-]{3,16}$/i,
                loginUsername: /(^[A-Za-z0-9_-]{3,16}$)|(^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([A-Za-z\.]{2,6})$)/,
                password: /^[A-Za-z0-9_-]{6,18}$/i,
                email: /^([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})$/i,
                url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                plainText: /^.{1,50}$/,
                phoneNumber: /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
                rowSeatsCount: /^\d{1,3}$/
            });
})(window);
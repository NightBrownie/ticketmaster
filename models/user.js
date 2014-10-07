(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');
    var bcrypt = require('bcrypt');
    var secret = require('../config/secret');
    var accessLevels = require('../modules/authorization/accessLevels');
    var userValidators = require('../modules/validation/userValidators');

    var SALT_WORK_FACTOR = secret.user.SALT_WORK_FACTOR;

    var userSchema = mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Number, required: true, default: accessLevels.userRoles.user }
    });

    userSchema.path('username').validate(userValidators.validateUsername, 'Invalid username');
    userSchema.path('password').validate(userValidators.validatePassword, 'Invalid password');
    userSchema.path('email').validate(userValidators.validateEmail, 'Invalid email');

    userSchema.pre('save', function(next) {
        var user = this;

        if (!user.isModified('password')) return next();
        
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    userSchema.methods.comparePassword = function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(isMatch);
        });
    };

    module.exports = mongoose.model('User', userSchema);
})(module);
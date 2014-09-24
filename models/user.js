(function(module, undefined) {
    'use strict';

    var mongoose = require('../config/mongooseConfig');
    var secret = require('../config/secret');

    var SALT_WORK_FACTOR = secret.user.SALT_WORK_FACTOR;

    var userSchema = mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

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

    var userModel = mongoose.model('User', userSchema);

    module.exports = userModel;
})(module);
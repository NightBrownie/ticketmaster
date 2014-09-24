(function(module, undefined) {
    var mongoose = require('mongoose');
    var mongoConfig = require('./mongoConfig');

    mongoose.connect(mongoConfig.mongoConnectionString);

    module.exports = mongoose;
})(module);
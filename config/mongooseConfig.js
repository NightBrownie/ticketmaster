(function(module, undefined) {
    var mongoose = require('mongoose');
    var mongoConfig = require('./mongoConfig');


    mongoose.connect(mongoConfig.mongoConnectionString);

    mongoose.connection.on('error', function(error) {
        console.log('Mongoose connection error occurred: ' + error);
        process.exit(1);
    });

    mongoose.connection.on('open', function(connection) {
        console.log('Mongoose is now connected to mongodb: ' + connection);
    });

    module.exports = mongoose;
})(module);
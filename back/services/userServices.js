const Q = require("q");
const jwt = require("jsonwebtoken");
const config = require('config');

var userServices = {};

userServices.generateToken = generateToken;

userServices.getUserById = function (id) {
    var deferred = Q.defer();

    const user = {
        _id: id
    };

    deferred.resolve(user);

    return deferred.promise;
};

function generateToken(user) {
    const deferred = Q.defer();
    const payload = { _id: user._id };

    jwt.sign(payload, config.get("secretOrKey"), { expiresIn: 720000 }, (err, token) => {
        if (err) deferred.reject(err);
        else deferred.resolve(token);

    })
    
    return deferred.promise;
}

module.exports = userServices;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userServices = require("../services/userServices");
const config = require('config');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secretOrKey");

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        userServices.getUserById(jwt_payload._id).then((user) => {
            return done(null, user);
        })
            .catch(err => {
                return done(null, false);
            })
    }))
}
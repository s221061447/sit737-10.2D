import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { getUser, doesUserExist, verifyAdmin, doesAdminExist } from './users.js';
import { Strategy as LocalStrategy } from 'passport-local';

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'TOP_SECRET_KEY';
opts.issuer = 'http://localhost:3030';

// JWT Admin Verification Strategy
passport.use('jwtAdmin', new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.role === 'admin' && doesAdminExist(jwt_payload.sub)) {
        return done(null, jwt_payload.sub);
    } else {
        return done(null, false);
    }
}));

// JWT User Verification Strategy
passport.use('jwtUser', new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.role === 'user' && doesUserExist(jwt_payload.sub)) {
        return done(null, jwt_payload.sub);
    } else {
        return done(null, false);
    }
}));

// Admin Login Strategy
passport.use('localAdmin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'apiKey'
    }, (email, apiKey, cb) => {
        if (verifyAdmin(email, apiKey)) {
            return cb(null, { email }, {message: 'Logged In Successfully'});
        } else {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
    }
));

// User Login Strategy
passport.use('localUser', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'apiKey'
    }, (email, apiKey, cb) => {
        if (getUser(email, apiKey)) {
            return cb(null, { email }, {message: 'Logged In Successfully'});
        } else {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
    }
));

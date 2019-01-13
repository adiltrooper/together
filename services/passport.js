const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user refers to mongoose model
  //serialiseUser uses user model to get the _id as the cookie
  done(null, user.id);
  //err obj, identifying piece of information
  //user.id is not profile id
  //user.id assigned by mongodb see in mongo _id
});

passport.deserializeUser((id, done) => {
  //deserializeUser takes the _id and find back a user model instance
  User.findById(id)
    .then(user => {
      done(null, user);
    });
//async action
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done ) => {

  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        //already have record with profile ID
          done(null, existingUser);
      } else {
        //dont have user record with the id, ,make new record
        new User({ googleId: profile.id })
            //this creates new model instance
          .save()
            //save that instance
          .then(user => {
            done(null, user);
            //use this user provided by callback even though might be same as above
          })
      }
    })


}
)
);

const passport = require("passport");
const mysql = require("mysql");
const db = require("../config_db/db");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config_keys/keys");

const connection = mysql.createConnection(db);

connection.connect(function(error) {
  if (error) {
    console.log("Error" + error.message);
  } else {
    console.log("Connected");
  }
});
passport.serializeUser((user, done) => {
  //user refers to what was just pulled out of db
  //serialiseUser uses user model to get the _id as the cookie
  done(null, user.id);
  //err obj, identifying piece of information
  //user.id is not profile id
  //user.id assigned by mongodb see in mongo _id
});

passport.deserializeUser((id, done) => {
  connection.query("SELECT * FROM user_info WHERE id =  ?", [id], function(
    err,
    results
  ) {
    done(null, results);
  });
  //deserializeUser takes the _id and find back a user model instance
  //async action
});

// Google Oauth 2.0 Sign Up
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      connection.query(
        "SELECT * FROM user_info WHERE user_id = ?",
        [profile.id],
        function(err, results) {
          if (err) {
            console.log(err.message);
            return done(err);
          }
          if (!err && results.length) {
            let existingUser;
            console.log("That account exists");
            return done(null, results[0]);
          } else {
            connection.query(
              "INSERT INTO user_info (user_id, user_name) VALUES (?, ?)",
              [profile.id, profile.displayName],
              function(err, results, fields) {
                results.id = results.insertId;
                return done(null, results);
              }
            );
          }
        }
      );

      //  User.findOne({ googleId: profile.id })
      //    .then((existingUser) => {
      //      if (existingUser) {
      //already have record with profile ID
      //          done(null, existingUser);
      //      } else {
      //dont have user record with the id, ,make new record
      //        new User({ googleId: profile.id })
      //this creates new model instance
      //          .save()
      //save that instance
      //          .then(user => {
      //            done(null, user);
      //use this user provided by callback even though might be same as above
      //          })
      //      }
      //    })
    }
  )
);

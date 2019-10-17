const passport = require("passport");
const mysql = require("mysql");
const db = require("../config_db/db");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config_keys/keys");

const connection = mysql.createConnection(db);

connection.connect(function(error) {
  if (error) {
    console.log("Error: " + error.message);
  } else {
    console.log("Connected");
  }
});

passport.serializeUser((user, done) => {
  //user refers to what was just pulled out of db
  //serialiseUser uses user model to get the _id as the cookie
  done(null, user.id);
  //arguments: err obj, identifying piece of information
  //user.id is not profile id
  //for mysql i assume user.id refers to user table database id?
});

passport.deserializeUser((id, done) => {
  //arguments: first argument is the id that was in the cookie
  connection.query("SELECT * FROM user_profile WHERE id = ?", [id], function(
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
    //creates new instance of GoogleStrategy, configuration here below
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      //URL for user to be automatically sent back after they grant permissions to our app
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("checking");
      connection.query(
        // "SELECT * FROM user_profile LEFT JOIN google_accounts ON user_profile.id = google_accounts.user_profile_id",
        "SELECT * FROM user_profile JOIN google_account ON user_profile.id = google_account.user_profile_id WHERE google_id = ?",
        profile.id,
        function(err, results) {
          if (err) {
            console.log(err.message);
            return done(err);
          }
          if (!err && results.length) {
            let existingUser;
            console.log(accessToken);
            console.log("That account exists");
            return done(null, results[0]);
          } else {
            console.log("creating new user");
            console.log(accessToken);
            connection.query(
              "INSERT INTO user_profile (first_name, last_name, profile_name, email, accept_tos) VALUES (?, ?, ?, ?, 1); INSERT INTO google_account (user_profile_id, google_id) VALUES (LAST_INSERT_ID(), ?)",
              [
                profile.name.givenName,
                profile.name.familyName,
                profile.name.givenName,
                profile.emails[0].value,
                profile.id
              ],
              function(err, results) {
                console.log(results);
                results[0].id = results[0].insertId;
                return done(null, results[0]);
                //first argument of null indicates no errors occurred
              }
            );
          }
        }
      );
    }
  )
);

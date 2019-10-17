const mysql = require("mysql");
const db = require("../config_db/db");
const connection = mysql.createConnection(db);
const requireLogin = require("../middlewares/requireLogin");

connection.connect(function(error) {
  if (error) {
    console.log("Error: " + error.message);
  } else {
    console.log("Connected");
  }
});

module.exports = app => {
  app.post("/compose/review", requireLogin, (req, res) => {
    const {
      review_description,
      price_per_pax,
      price_per_hr,
      avg_time_spent,
      wicb,
      review_datetime
    } = req.body;

    console.log(req.body);
    //need to confirm that listing exists for review to be included

    connection.query(
      "INSERT INTO reviews (user_profile_id, listing_id, review_description, price_per_pax, price_per_hr, avg_time_spent, wicb) VALUES ((SELECT id FROM user_profile WHERE profile_name = 'Muhammad Adil'), (SELECT id FROM listing WHERE id = 5), ?, ?, ?, ?, ?)",
      [review_description, price_per_pax, price_per_hr, avg_time_spent, wicb],
      function(err, results) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Review has been inserted into database");
        }
      }
    );
  });

  app.post("/compose/listing", requireLogin, (req, res) => {
    console.log("composing a listing");

    const {
      activity_name,
      activity_description,
      temporary_event,
      start_date,
      end_date,
      start_time,
      end_time,
      satisfaction_score,
      price_per_pax,
      price_per_hr,
      time_spent,
      max_time_spent,
      min_time_spent,
      wicb,
      when_created
    } = req.body;

    connection.query(
      "INSERT INTO listing (user_profile_id, activity_name, activity_description, temporary_event, start_date, end_date, start_time, end_time, satisfaction_score, price_per_pax, price_per_hr, time_spent, max_time_spent, min_time_spent, wicb) VALUES ((SELECT id FROM user_profile WHERE profile_name = 'Muhammad Adil'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        activity_name,
        activity_description,
        temporary_event,
        start_date,
        end_date,
        start_time,
        end_time,
        satisfaction_score,
        price_per_pax,
        price_per_hr,
        time_spent,
        max_time_spent,
        min_time_spent,
        wicb
      ],
      function(err, results) {
        if (err) {
          console.log(err.message);
        } else {
          res.redirect("/");
        }
      }
    );
  });
};

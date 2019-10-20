const mysql = require("mysql");
const db = require("../config_db/db");
const pool = mysql.createPool(db);
const multer = require("multer");
const path = require("path");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only upload images please");
  }
}

var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "../uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + " - " + Date.now() + path.extname(file.originalname)
    );
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});
const upload = multer({ storage: storage }).single("testfile");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // app.post("/compose/review", requireLogin, (req, res) => {
  //   pool.getConnection(function(err, connection) {
  //     if (err) {
  //       res.send("Connection Error");
  //     } else {
  //       const {
  //         activity_name,
  //         activity_description,
  //         temporary_event,
  //         start_date,
  //         end_date,
  //         price,
  //         avg_time_spent,
  //         location_id,
  //         location_name,
  //         wicb,
  //         review_datetime
  //       } = req.body;
  //
  //       console.log(req.body);
  //       //whats happening: off the body property, i want to get access to these properties
  //       //need to confirm that listing exists for review to be included
  //       connection.beginTransaction(function(err) {
  //         connection.query(
  //           "INSERT INTO reviews (user_profile_id, listing_id, review_description, price_per_pax, price_per_hr, avg_time_spent, wicb) VALUES ((SELECT id FROM user_profile WHERE profile_name = 'Muhammad Adil'), (SELECT id FROM listing WHERE id = 5), ?, ?, ?, ?, ?)",
  //           [
  //             review_description,
  //             price_per_pax,
  //             price_per_hr,
  //             avg_time_spent,
  //             wicb
  //           ],
  //           function(err, results, fields) {
  //             if (err) {
  //               return connection.rollback(function() {
  //                 throw error;
  //               });
  //             }
  //
  //             connection.query(
  //               "INSERT INTO category (category_title) VALUES ?",
  //               [category_title],
  //               function(err, results, fields) {
  //                 if (err) {
  //                   return connection.rollback(function() {
  //                     throw error;
  //                   });
  //                 }
  //               }
  //             );
  //           }
  //         );
  //       });
  //     }
  //   });
  // });

  //POSTING NEW LISTING + STORING NEW LISTING
  app.post("/compose/listing", requireLogin, upload, (req, res, next) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        res.send("Connection Error");
      } else {
        const {
          activity_name,
          tags,
          price,
          duration,
          temporary,
          activity_description
        } = req.body;

        var tagsArray = tags.split(",");
        var nestedArray = [];
        for (var v in tagsArray) {
          nestedArray.push([tagsArray[v]]);
        }

        const foursquare_id = JSON.parse(req.body.foursquare_id).id;
        const user_profile_id = req.user[0]["id"];
        const img_path = req.file["path"].slice(10);
        const uploadedFile = req.file;

        const localImgConfig = "/Users/adil/Dropbox/Datehive/uploads";

        //need to confirm that listing exists for review to be included
        connection.beginTransaction(function(err) {
          connection.query(
            "INSERT INTO listing (user_profile_id, foursquare_id, activity_name,  duration, temporary, price, activity_description) VALUES (?, ?, ?, ?, ?, ?)",
            [
              user_profile_id,
              foursquare_id,
              activity_name,
              duration,
              temporary,
              price,
              activity_description
            ],
            function(err, results, fields) {
              if (err) {
                return connection.rollback(function() {
                  console.log(err);
                });
              }

              connection.query("SET @listing_id = LAST_INSERT_ID()", function(
                err,
                results,
                fields
              ) {
                if (err) {
                  return connection.rollback(function() {
                    console.log(err);
                  });
                }

                connection.query(
                  "INSERT INTO img_listing (listing_id, user_profile_id, img_path) VALUES (@listing_id, ?, ?)",
                  [user_profile_id, img_path],
                  function(err, results, fields) {
                    if (err) {
                      return connection.rollback(function() {
                        console.log(err);
                      });
                    }

                    connection.query(
                      "INSERT IGNORE INTO tags (tag_name) VALUES ? ",
                      [nestedArray],
                      function(err, results, fields) {
                        if (err) {
                          return connection.rollback(function() {
                            console.log(err);
                          });
                        }
                        var query = "Select id FROM tags WHERE tag_name IN (";

                        for (i = 0; i < tagsArray.length; i++) {
                          query = query + "'" + tagsArray[i] + "'" + ",";
                        }
                        query = query.substring(0, query.length - 1);
                        query = query + ")";

                        connection.query(query, function(err, results, fields) {
                          if (err) {
                            return connection.rollback(function() {
                              console.log(err);
                            });
                          }

                          const tagsResults = JSON.parse(
                            JSON.stringify(results)
                          );
                          const tagsResultsArray = [];
                          for (var v in tagsResults) {
                            tagsResultsArray.push(tagsResults[v].id);
                          }
                          console.log(tagsResultsArray);

                          var query1 =
                            "INSERT INTO listing_tags (listing_id, tags_id) VALUES ";

                          for (i = 0; i < tagsResultsArray.length; i++) {
                            query1 =
                              query1 +
                              "(" +
                              "@listing_id" +
                              "," +
                              tagsResultsArray[i] +
                              ")" +
                              ",";
                          }

                          console.log(query1);
                          query1 = query1.substring(0, query1.length - 1);

                          console.log(query1);
                          connection.query(query1, function(
                            err,
                            results,
                            fields
                          ) {
                            if (err) {
                              return connection.rollback(function() {
                                console.log(err);
                              });
                            } else {
                              if (results) {
                                console.log(results);
                                console.log("hello");
                              }
                            }
                            connection.commit(function(err) {
                              if (err) {
                                return connection.rollback(function() {
                                  throw err;
                                });
                              }
                              console.log("New Listing Saved!");
                              res.send("Hello");
                            });
                          });
                        });
                      }
                    );
                  }
                );
              });
            }
          );
        });
      }
      connection.release();
    });
  });
};

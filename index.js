const express = require("express");
const keys = require("./config_keys/keys");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const csp = require("helmet-csp");
const winston = require("winston");
const logger = require("heroku-logger");
require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//tell passport to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

console.log("HELLO");

authRoutes(app);
reviewRoutes(app);
{
  /*app.use(
  csp({
    directives: {
      defaultSrc: ["data: blob:"],
      scriptSrc: ["data: blob:", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["data: blob:"],
      fontSrc: ["data: blob:"],
      imgSrc: ["'self'", "data:"],
      reportUri: "/report-violation",
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
      workerSrc: false // This is not set.
    }
  })
);

app.post(`/api/csp/report`, (req, res) => {
  winston.warn(`CSP header violation`, req.body[`csp-report`]);
  res.status(204).end();
});*/
}

//telling express to make use of cookies as it does not have capability out of the box

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets like js files
  app.use(express.static("client/build"));
  //Express will serve up index.html file if dont recognise route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

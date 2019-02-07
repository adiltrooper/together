const express = require("express");
const keys = require("./config_keys/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

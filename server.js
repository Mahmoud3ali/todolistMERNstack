const express = require("express"); // include express so we can use it
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const list = require("./routes/api/list");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Database Connected."))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Password config
require("./config/passport.js")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/list", list);

const port = process.env.port || 5000; // for heroku use first, otherwise use 5000

app.listen(port, () => console.log("server running" + port));

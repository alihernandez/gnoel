const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const path = require('path');
const currPath = __dirname + "/node_app/views/";
const uri = process.env.MONGODB_URI;
require('dotenv').config();

const app = express();
var corOptions = {
  origin: "0.0.0.0/0"
};

app.use(cors(corOptions));
// parse requests of content-type - application/json

// app.use(express.json());
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(currPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to app backend" });
});
// set port, listen for requests

const db = require("./node_app/models");
const Role = require("./node_app/models/role.model");
db.mongoose
  .connect(
    process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require("./node_app/routes/blog.routes")(app);
require('./node_app/routes/auth.routes')(app);
require('./node_app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

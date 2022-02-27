const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/node_app/views/';
const app = express();
var corOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corOptions));
// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to app backend"});
});
// set port, listen for requests

const db = require("./node_app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connect to database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./node_app/routes/blog.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
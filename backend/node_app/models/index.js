const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = globalPromise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.blogs = require("./blog.model.js")(mongoose);
module.exports = db;
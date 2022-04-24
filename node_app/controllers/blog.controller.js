const db = require("../models");
const Blog = db.blogs;
const upload = require("../middleware/upload");
const dbConfig = require("../config/db.config");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const baseUrl = "http://localhost:8080/files/";
const mongoClient = new MongoClient(url);
// Create and Save a new blog
exports.create = (req, res) => {
// Validate request
if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!"});
    return;
}
// Create a Blog
const blog = new Blog({
    title:req.body.title,
    description: req.body.description,
    punlished: req.body.published ? req.body.published : false
});
// Save blog in database
blog
    .save(blog)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while creating blog."
        });
    });
};


exports.uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file);
        if(req.file == undefined) {
            return res.send({
                message: "You must select a file",
            });
        }
        return res.send({
            message: "File has been uploaded",
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: "error when trying upload image ${error}",
            
        });
    }
};

// Retrieve all Blogs from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i"} } : {};
    Blog.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retriving blog posts."
        });
    });
};

// Retrieve a single object
exports.findOne = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Blog not found with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Blog with id=" + id });
    });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res/status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Blog with id=${id}. Maybe blog was not found!`
                });
            }   else res.send({ message: "Blog was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Blog with id =" + id
            });
        });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
            });
        } else {
            res.send({
                message: "Blog was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Blog with id=" + id
        });
    });
};

// Delete all Blogs from the database
exports.deleteAll = (req, res) => {
    Blog.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deleteCount} Blogs were successfully deleted!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all blogs."
        });
    });
};

// Find all published Blogs
exports.findAllPublished = (req, res) => {
    Blog.find({ bublished: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving blogs."
        });
    });
};


exports.getListFiles = async (req, res) => {
    try {
        await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
        }
        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
            });
        });
        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.nmessage,
        });
    }
};
exports.download = async (req, res) => {
    try {
        await mongoClient.connect();
        const database = mongoClient.db(dbConfig.database);
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.imgBucket,
        });
        let downloadStream = bucket.openDownloadStreamByName(req.params.name);
        downloadStream.on("data", function(data) {
            return res.status(200).write(data);
        });
        downloadStream.on("error", function(err) {
            return res.status(404).send({ message: "cannot download image!"});
        });
    } catch (error) {
        return res.status(500).send({
            message:error.message,
        });
    }
};

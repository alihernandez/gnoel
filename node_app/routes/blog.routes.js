module.exports = app => {
    const blogs = require("../controllers/blog.controller");
    var router = require("express").Router();

    // Create a new Blog
    router.post("/", blogs.create);
    // Retrive all Blogs
    router.get("/", blogs.findAll);
    // Retrieve all published blogs
    router.get("/published", blogs.findAllPublished);
    // Retrive a single blog with id
    router.get("/:id", blogs.findOne);
    // Update a blog with id
    router.put("/:id", blogs.update);
    // Delete a blog with id
    router.delete("/:id", blogs.delete);
    // Delete ALL blogs
    router.delete("/", blogs.deleteAll);
    app.use('/api/blogs', router);
}
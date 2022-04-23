import React, { useState } from "react";
import BlogDataService from "../services/blog.service";
const AddBlog = () => {
  const initialBlogState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [blog, setBlog] = useState(initialBlogState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };
  const saveBlog = () => {
    var data = {
      title: blog.title,
      description: blog.description,
      article: blog.article
    };
    BlogDataService.create(data)
      .then((response) => {
        setBlog({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          description: response.data.article,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newBlog = () => {
    setBlog(initialBlogState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBlog}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={blog.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={blog.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Article</label>
            <input
              type="text"
              className="form-control"
              id="article"
              required
              value={blog.article}
              onChange={handleInputChange}
              name="article"
            />
          </div>
          <div className="form-group">
            <label for="avatar">Choose a cover image:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
            />
          </div>
          <button onClick={saveBlog} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddBlog;

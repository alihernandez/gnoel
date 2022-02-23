import React, { useState, useEffect } from "react";
import BlogDataService from "../services/blog.service";
import { Link, useParams } from "react-router-dom";
const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveBlogs();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const retrieveBlogs = () => {
        BlogDataService.getAll()
        .then(response => {
            setBlogs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    

    const refreshList = () => {
        retrieveBlogs();
        setCurrentBlog(null);
        setCurrentIndex(-1);
    };
    const setActiveBlog = ( blog, index) => {
        setCurrentBlog(blog);
        setCurrentIndex(index);
    };
    const removeAllBlogs = () => {
        BlogDataService.removeAll()
        .then(response => {
            console.log(response.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    };
    const findByTitle = () => {
        BlogDataService.findByTitle(searchTitle)
        .then(response => {
            setBlogs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    return (
        <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Blog List</h4>
        <ul className="list-group">
          {blogs &&
            blogs.map((blog, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBlog(blog, index)}
                key={index}
              >
                {blog.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBlog ? (
          <div>
            <h4>Blog</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlog.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBlog.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlog.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"/blogs/" + currentBlog._id}
              // className="badge badge-warning"
              onClick={() => {
                console.log(currentBlog._id)
              }}
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
    </div>

    );
};
export default BlogList;
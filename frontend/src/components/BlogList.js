import React, { useState, useEffect } from "react";
import BlogDataService from "../services/blog.service";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import write from "../images/writing.jpg";
import '../App.css';
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
    // const removeAllBlogs = () => {
    //     BlogDataService.removeAll()
    //     .then(response => {
    //         console.log(response.data);
    //         refreshList();
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // };
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
          <div className="head">
          <h1 id="name">Garrett Noel</h1> 
          <img id="writingPic" src={write}></img>
          </div>
            <div className="aboutMe">
            
            <p>
            Busey ipsum dolor sit amet. You ever roasted doughnuts?It's good to yell at people and tell people that you're from Tennesee, so that way you'll be safe.Sometimes horses cough and fart at the same time, so stay out of the range of its butt muscle because a horses butt muscle is thick. 
            <br />

These kind of things only happen for the first time once.It's good to yell at people and tell people that you're from Tennesee, so that way you'll be safe.Have you urinated? Have you drained your bladder? Are you free? Because if you haven't it will only come out later. I'm giving you some information that your bodily fluids may penetrate your clothing fibre's without warning.
<br />

These kind of things only happen for the first time once.It's OK to get Rib-grease on your face, because you're allowing people to see that you're proud of these ribs.I would like to give you a backstage pass to my imagination.It's good to yell at people and tell people that you're from Tennesee, so that way you'll be safe.
            </p>

            </div>

      <div id="arts">
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
              className="btn"
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
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBlogs}
        >
          Remove All
        </button> */}
      </div>
      
      <div className="col-md-6">
        {currentBlog ? (
          
          <div>
            <h4>Blog</h4>
            <div className="blogCard">
              
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBlog.title}
            </div>
            <div>
              <span>image</span>
              <img src={currentBlog.image}
 alt="imgCover"></img>              
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBlog.description}
            </div>

            {/* <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlog.published ? "Published" : "Pending"}
            </div> */}
            {/* <Link
              to={"/blogs/" + currentBlog._id}
              // className="badge badge-warning"
              onClick={() => {
                console.log(currentBlog._id)
              }}
            >
              Edit
            </Link> */}
          </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Blog...</p>
          </div>
        )}
      </div>
      </div>

    
      
    </div>

    );
};
export default BlogList;
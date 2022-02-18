import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import "./App.css";

function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            GP NOEL
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/blogs"} className="nav-link">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" component={BlogList} />
            <Route exact path="/add" component={AddBlog} />
            <Route path="/blogs/:id" component={Blog} />
          </Routes>
        </div>
      </div>
    );
  }
export default App;
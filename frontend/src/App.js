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
          <a href="/blogs" className="navbar-brand">
            GP NOEL
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
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
            <Route path="/" exact element={<BlogList />} />
            <Route exact path="/add" element={<AddBlog />} />
            <Route path="/blogs/:id" exact element={<Blog />} />
          </Routes>
        </div>
      </div>
    );
  }
export default App;
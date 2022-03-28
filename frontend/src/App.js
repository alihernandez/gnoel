import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const cRole = () => {console.log( {user: currentUser.roles}) };

  useEffect(() => {
    if (currentUser) {
    setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
    setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  } else {
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
  }

  EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

    return (
      // <Router history={history}>
//Home: always
//Login & Sign Up: if user hasn’t signed in yet
// User: there is user value in the application state
// Board Moderator: roles includes ROLE_MODERATOR
// Board Admin: roles includes ROLE_ADMIN
      <div className="appContainer">
        <nav className="navbar navbar-expand navbar-dark">
          <a href="/blogs" className="navbar-brand">
            GP NOEL
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
                <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
             )} 
             {currentUser && (
               <li className="nav-item">
               <Link to={"/profile"} className="nav-link">
                 Profile
               </Link>
               <Link to={"/user"} className="nav-link">
                  User
                </Link>
             </li>
              )}
              </div>
              {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link" onClick={cRole}> 
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              </div>
                ) : (
                  <div className="navbar-nav ml-auto"> 
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
              </li> 
          </div>
                )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" exact element={<BlogList />} />
            <Route exact path="/add" element={<AddBlog />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route exact path="/admin" element={<BoardAdmin />} />
            <Route path="/blogs/:id" exact element={<Blog />} />
          </Routes>
        </div>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
      // </Router>
    );
  }
export default App;
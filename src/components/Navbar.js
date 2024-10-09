import React from "react";
import { useState, useEffect } from "react";
import  "./Navbar.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { deleteUser, getUserStatus } from "../services/api";

const refresh = () => {
  window.location.reload(true);
};

function Navbar() {
  const [isActive, setIsActive] = useState(null); 
  const nUserName = sessionStorage.getItem("username")?.replace(/"/g, "'");

  useEffect(() => {
    if (nUserName) {
      getUserStatus(nUserName)
        .then(res => {
          console.log(res)
          setIsActive(res.data); 
        })
        .catch(err => {
          console.error("Error fetching user status", err);
        });
    }
  }, [nUserName]);

  const handleDelete = () => {
    const loggedInUserName = JSON.parse(sessionStorage.getItem("username"));
    deleteUser(loggedInUserName).then(() => {
      sessionStorage.clear();
      refresh();
    });
  };

  return (
    <nav className="nav">
      <img src={require("../images/finallogo.jpg")} className="logo" alt="Logo-ABS" />

      <SearchBar />

      <div className="topnav" id="myTopnav">
        { isActive ? (
          <>
            <span onClick={refresh}>
              <Link to="/logout" className="logout" id="out">
                Log Out
              </Link>
            </span>
            <span onClick={handleDelete}>
              <Link to="/" className="deleteAccount">
                Delete Account
              </Link>
            </span>
          </>
        ) : (
          <>
            <span onClick={refresh}>
              <Link to="/login" className="active">
                Login
              </Link>
            </span>
            <span onClick={refresh}>
              <Link to="/signUp" className="signup">
                Sign Up
              </Link>
            </span>
          </>
        )}
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <i>&#9776;</i>
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <button onClick={refresh} className="hbtn">
            <Link to="/home" className="favorite" id="f">
               Home Page
            </Link>
          </button>
          <button onClick={refresh} className="hbtn" > 
            <Link to="/favoritePage"  
            className="favorite" id="f">
              Favorite Page
            </Link>
          </button>
          <button onClick={refresh} className="hbtn">
            <Link to="/orderPage" className="favorite" id="f">
              Order Page
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

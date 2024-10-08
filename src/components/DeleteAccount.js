import React, { useRef, useState, useEffect, Fragment, useContext } from "react";
import { authenticate, updateUser, deleteUser} from "../services/api";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function DeleteAccount() {




  var loggedInUserName = JSON.parse(sessionStorage.getItem("username"))

console.log(loggedInUserName)
  
  deleteUser(loggedInUserName);

return(
    <Link to="/" class="all" > <h2 class="homeS"> Your Account Deleted </h2></Link>

)

    }

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });
      
        return (
          <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
              {children}
            </Link>
          </li>
        )
      }
      
      
      
      export default DeleteAccount;
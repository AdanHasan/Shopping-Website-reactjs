import React, { useEffect } from "react";
import { authenticate, updateUser } from "../../services/api";
import { Link, useMatch, useResolvedPath,useNavigate   } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "./Logout.css"; // Changed to match import style consistency


function Logout() {
  const loggedInUserName = JSON.parse(sessionStorage.getItem("username"));
  const navigate = useNavigate(); 
  const userSecondBody = {
    username: loggedInUserName,
    active: 0
  };

  // Handle the update user status
  useEffect(() => {
    const updateUserStatus = async () => {
      
        // Wait for the updateUser API call to complete
        const response = await updateUser(userSecondBody);
        {sessionStorage.setItem('isActive', JSON.stringify(false))}
        navigate('/');
    
    };

    updateUserStatus();
  }, [navigate, userSecondBody]); // Add dependencies to the effect hook

  
}

export default Logout;

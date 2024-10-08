import React from "react";
import { useState, useEffect } from "react";
import classes from "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "./SearchBar";
import {  deleteUser} from "../services/api";
const refresh = () => {
  window.location.reload(true);

}

const refresh2 = () => {
           sessionStorage.clear();
 
        }

function Comnav(props) {

  const deleted = () =>{
    var loggedInUserName = JSON.parse(sessionStorage.getItem("username"))
deleteUser(loggedInUserName)
  }
    const [userActive, setUserActive] = useState(sessionStorage.getItem('isActive'));

  useEffect(() => {
    setUserActive(sessionStorage.getItem('isActive'))
    // console.log(userActive);
    // console.log(props.userActive);

  },[userActive]);

  //  setUserActive(localStorage.getItem('isActive'))
  //  console.log(userActive);

  // var userActive = localStorage.getItem('isActive');
  // const [userActive, setUserActive] = useState(localStorage.getItem('isActive'));

  // useEffect(() => {
  //       if(userActive){
  //         return (    <>
  //                  <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
  //                  <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span> 
  //                  { setUserActive(!userActive)}     
  //                  </>
  //                                     )

  //       }else{
  //           return (<>
  //            <span onClick={refresh}><Link to="/logout" class="logout" id="out">Log Out</Link></span>
  //             {setUserActive(!userActive)}    
  //             </> 
  //           );
  //       }

  // });


    // var userActive = false;

  return (
    <>
      
        {/* <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
            <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span>   
            <span onClick={refresh}><Link to="/logout" class="logout" id="out">Log Out</Link></span> 
              */}


          {/* <CustomLink to="/login" class="active">Login</CustomLink>
             <CustomLink to="/signUp" class="signup ">Sign Up</CustomLink>
             <CustomLink to="/logout" class="logout">Log Out</CustomLink> */}

          {/* <a  class="active">Login</a>
              <a  class="signup ">Sign Up</a>
              <a  class="logout">Log Out</a>  */}

             
              { props.userActive==false ? <div style={{color: "blue"}}> {sessionStorage.getItem('isActive')} </div> :  <div style={{color: "yellow"}}>sdxfcgvbhjnkml</div>}
           {/* {(userActive==true) ? (
      <>   
      <span  onClick={() => {
           refresh();
           refresh2();
           }}><Link to="/logout" class="logout" id="out">Log Out</Link></span>

      </>
                   ) : (
                    <>
                    <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
                     <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span>   
                     </> 
            
          )}  */}

           {/* <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
          <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span>  */}

          {/* <span onClick={(refresh() refresh2())}><Link to="/logout" class="logout" id="out">Log Out</Link></span> */}


            {/* <span  onClick={() => {
          refresh();
          refresh2();
        }}><Link to="/logout" class="logout" id="out">Log Out</Link></span>   */}
{/* adan */}
{/* <span 
 onClick={() => {
          refresh();
          refresh2();
        }}
         ><Link to="/deleteAccount"class="delAcc" >Delete Account</Link></span>   */}



{/* Lelian */}
{/* <span class="logout" id="out" onClick={() => {
  deleted();
          refresh();
          refresh2();

        }}><Link to="/" class="logout" >DELETE</Link></span> */}



       
    </>

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

export default Comnav;
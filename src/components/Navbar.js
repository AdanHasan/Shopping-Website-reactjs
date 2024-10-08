import React from "react";
import { useState, useEffect } from "react";
import classes from "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "./SearchBar";
import {  deleteUser,getUserStatus} from "../services/api";
import Comnav from "./Comnav"

const refresh = () => {
  window.location.reload(true);

}

// const refresh2 = () => {
//            sessionStorage.clear();
 
//         }

function Navbar() {
   const [userActive, setUserActive] = useState(sessionStorage.getItem('isActive'));
   const [essa, setEssa] =useState([]);
   const[show,setShow]=useState(true);

  //  const[show,setShow]=useState(true);
var status;

   let bUserName = sessionStorage.getItem("username")
   let nUserName;
   if(sessionStorage.getItem("username")){
       nUserName = bUserName.replace(/"/g, "'");
   }

  
  
  const deleted = () =>{
    var loggedInUserName = JSON.parse(sessionStorage.getItem("username"))
deleteUser(loggedInUserName)
  }

  useEffect(() => {
    //  var loggedInUserName = (sessionStorage.getItem("username"))
    //  console.log(loggedInUserName);

     setUserActive((sessionStorage.getItem('isActive')))
    //  console.log(userActive)

// console.log(show)
    // var loggedInUserName = JSON.parse(sessionStorage.getItem("username"))
    // getUserStatus(loggedInUserName).then(
    //   console.log("ghn")
    // )
var status;


    getUserStatus(nUserName).then(

      res => {
         status = res.data;
        //   const itemOptions = res.data.map(item => {

        //       return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div className="tPrice"> {item.price} USD </div>
        //           <br></br><div> {item.inStock} In Stock </div> <br></br><br></br><br></br>
        //         <span> <label class="labelQuantity">Quantity :</label> 
        //         <input  required key={item.id} class="inputQuantity" type="number"
        //         value={enteredQuantity}
        //         onChange={quantityChangeHandler}
        //        >
        //  </input>
        //         </span>
        //           <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
        //           <span class="cartIcon"onClick={(e) => secondChangeIcon(item,e)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span>  </div>)

        //   });
        //   setExistingItems(itemOptions);

        // const status = res.data.map(item => {


      });

    //  getUserStatus(nUserName).then(
    //                 res => {
    //                      status = res.data;
                              
                      

    //             }
    //             );

    //             if(status==true)
    //             {
    //             return (
    //               <>
    //               <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
    //               <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span> 
    //               </>
    //             )
    //             }
    //             else {
    //                 return (
    //                   <span  onClick={() => {
    //                     refresh();
    //                     // refresh2();
    //                   }}><Link to="/logout" class="logout" id="out">Log Out</Link></span>                                
    //             )          
    //           }

});
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
      <nav className="nav">
        <img src={require('../images/finallogo.jpg')} className="logo" alt="Logo-ABS"></img>



        <SearchBar />
        <div class="topnav" id="myTopnav">


 <span onClick={refresh} ><Link to="/login" class="active" >Login</Link></span>
          <span onClick={refresh} ><Link to="/signUp" class="signup">Sign Up</Link></span>   
          </div> 
          
        
      

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
          {/* {(userActive==true) ? (
      <>   
      <span  onClick={() => {
           refresh();
          //  refresh2();
           }}><Link to="/logout" class="logout" id="out">Log Out</Link></span>

      </>
                   ) : (
                    <>
                    <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
                     <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span>   
                     </> 
            
          )} */}

            {/* <span onClick={refresh}><Link to="/login" class="active" >Login</Link></span>
          <span onClick={refresh}><Link to="/signUp" class="signup">Sign Up</Link></span>   */}

          {/* <span onClick={(refresh() refresh2())}><Link to="/logout" class="logout" id="out">Log Out</Link></span> */}

             {/* <span  onClick={() => {
          refresh();
          // refresh2();
        }}><Link to="/logout" class="logout" id="out">Log Out</Link></span>    */}
        <div class="topnav" id="myTopnav">


 {/* adan  */}

 {/* <span 
 onClick={() => {
          refresh();
          // refresh2();
        }}
         ><Link to="/deleteAccount"class="delAcc" >Delete Account</Link></span>  */}


{/* Lelian */}
{/* <span class="logout" id="out" onClick={() => {
  deleted();
          // refresh();
          // refresh2();

        }}><Link to="/" class="logout" >DELETE</Link></span> */}

          <div class="dropdown" >
            <button class="dropbtn"><i>&#9776;</i>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                {/* <button onClick={refresh} class="hbtn"><Link to="/favoriteItems" class="favorite" id="f">Favorite Items</Link></button> */}

              {/* <button onClick={refresh} class="hbtn" ><Link to="/" className="home" id="h"> Home </Link></button> */}


              {/* <button onClick={refresh} class="hbtn"><Link to="/homeNew" class="favorite" id="f">New Home Page</Link></button>
              <button onClick={refresh} class="hbtn"><Link to="/orderList" class="orderList" id="o" >Order List</Link></button>

              <button onClick={refresh} class="hbtn"><Link to="/favoritePage" class="favorite" id="f">Favorite Page</Link></button>
              <button onClick={refresh} class="hbtn"><Link to="/orderPage" class="favorite" id="f">Order Page</Link></button> */}

<button onClick={refresh}  class="hbtn"><Link to="/homeNew" class="favorite" id="f">New Home Page</Link></button>

              <button onClick={refresh}  class="hbtn"><Link to="/favoritePage" class="favorite" id="f">Favorite Page</Link></button>
              <button onClick={refresh}   class="hbtn"><Link to="/orderPage" class="favorite" id="f">Order Page</Link></button>
            </div>

          </div>

        </div>

      </nav>

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

export default Navbar;
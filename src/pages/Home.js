import React from "react";
import { getAllItems , getAllOrders  , getAllUsers, getAllUserItems,getAllOrderItems} from "../services/api";
import { useState, useEffect } from "react";
import {Link , json, useMatch , useResolvedPath} from "react-router-dom";
import "./Home.css";
import FavoriteItems from "./FavoriteItems";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { render } from "@testing-library/react";
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import {user} from "../components/registration/Login";
import Item from "./Item";
import OrderItem from "./OrderItem";





function Home() {
    const [currentId, setCurrentId] = useState(); 
    const [registeredUser , setRegisteredUser]=useState([]);
    var enteredOrderDate;

    const [existingItems, setExistingItems] = useState([]);
    const [noww, setNoww] = useState([]);
    const [arrOrderItems, setArrOrderItems] = useState([]);

    const [temps, setTemps] = useState([]);

    let bUserName = sessionStorage.getItem("username")
    let nUserName;
    if(sessionStorage.getItem("username")){
        nUserName = bUserName.replace(/"/g, "'");
    }

   
    const userItemsBody ={
       userName: nUserName
    }

    const [currentItems, setCurrentItems] = useState([]);


useEffect(() => {
  let favorites =[];
  let arrOfTemps= [];
  let arrOfOrderItems = [];
  let arrOfItems =[];
  let arrOfOrders=[];
  
  
                    getAllUserItems(userItemsBody)
                    .then((res) => {
                           favorites = res.data.map((userItems) => userItems.id);
                           setNoww(favorites);
  
  return{
    favorites,allOrdersPromise:getAllOrders()
  };})
  .then(({favorites,allOrdersPromise}) => {
    return allOrdersPromise.then((allOrdersRes) => {
      arrOfTemps= allOrdersRes.data.map(order => {
        if(order.status == "TEMP"&&order.userName==JSON.parse(sessionStorage.getItem("username"))){
          return (order.id )

        }
     
      });  

    const itemPromises = arrOfTemps.map((orderId) => 
    getAllOrderItems(orderId).then((res) => 
    arrOfOrderItems= res.data.map((item) => ({ 
    
        ...item, 
        liked: false, 
        cart: false 
 
      })
      )
    )
  );

    return Promise.all(itemPromises).then((resItems) => {
      setCurrentItems(resItems);
      setNoww(favorites);
            setTemps(arrOfTemps);
            setArrOrderItems(arrOfOrderItems)

    });


      });
  }
  )

  .catch((err) => console.error("An error occurred", err));

          getAllItems().then(
  
              res => {
                  const itemOptions = res.data.map((item) => {
  
                      const temp = {
                          id:item.id,
                          title: item.title,
                          price: item.price,
                          quantity: item.quantity,
                          inStock: item.inStock,
                          pictureUrl: item.pictureUrl,
                          liked: false,
                          cart: false
                      }
                      return (

                        <>
                          <Item item={temp}  favorites={favorites} arrOfTemps={arrOfTemps} lastId={currentId} arrOfOrderItems={arrOrderItems} arrOfOrders={arrOfOrders}/>
                          </>

                          )
                        
                  });
                  
                  setExistingItems(itemOptions);
  
  
              })
         
                  
  
    getAllUsers().then(
  
  res => {
    const users= res.data.map(user => {
  
            if(user.username==JSON.parse(sessionStorage.getItem("username"))){
  
          return (
              <>
  <div class="row">{existingItems}</div>    
      </>
          )
        }
     
      });
  setRegisteredUser(users);    
    }
    
    );



  
      }, [existingItems]);
 
        
    return (

        <>
<br></br>
<br></br>
<h2 class="qoute">Sunglasses are like eye shadow: They make everything look younger and pretty.</h2>
   
            <span>
   

                    {registeredUser}

            </span>


        </>
    );

}

function CustomLink({to , children , ...props}){
    const resolvedPath=useResolvedPath(to)
    const isActive=useMatch({path:resolvedPath.pathname , end:true});
  
    return(
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}> 
        {children}
        </Link>
      </li>
    )
  }


export default Home;
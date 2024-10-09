import React from "react";
import  "./FavoriteItems.css";
import { FaHeart } from "react-icons/fa"
import { useState, useEffect } from "react";
import {  updateOrder, createOrder, getAllUserItems, deleteUserItem,createOrderItem } from "../services/api";
import { BsCartPlus } from "react-icons/bs"

import FavoriteItem from "./FavoriteItem";



function FavoriteItems() {

    const [existingFavProduct, setExistingFavProduct] = useState([]);
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [itemPrices, setItemPrices] = useState([]);
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
    const [currentId, setCurrentId] = useState();
    const [registeredUser, setRegisteredUser] = useState([]);

    const [itemQuantity, setItemQuantity] = useState([]);

    const [noww, setNoww] = useState([]);

    var enteredTotalPrice = 0;
    var enteredOrderDate;



    const quantityChangeHandler = (event) => {
        setEnteredQuantity(event.target.value.split(',').reduce((a, c) => a + (isNaN(+c) ? 0 : +c), 0))

    };

    const getDate = () => {
        var date = new Date();
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
        var current_date = year + "-" + month + "-" + day;

        enteredOrderDate = current_date;

    }

    const orderCreate = () => {

        getDate();

        const orderToCreate = {
            userId: 1,
            orderDate: enteredOrderDate,
            shippingAddress: enteredShippingAddress,
            totalPrice: enteredTotalPrice,
            status: "TEMP",
            itemId: 3
        }

        createOrder(orderToCreate);

        console.log(orderToCreate);


    }



    const orderUpdate = () => {
        getDate();

        const orderToUpdate = {
            id: currentId,
            userId: 1,
            orderDate: enteredOrderDate,
            shippingAddress: enteredShippingAddress,
            totalPrice: enteredTotalPrice,
            status: "TEMP",
            itemId: 3
        }

        updateOrder(orderToUpdate);
        console.log(orderToUpdate);

    }

    const changeIcon = (userItems) => {
        const UserItemsToDelete = {
            userName: JSON.parse(sessionStorage.getItem("username")),

            id: userItems.id
          }
          deleteUserItem(UserItemsToDelete);
        
    };

   



    const secondChangeIcon=(userItems)=>{
        const orderItemToCreate = {
            userName:JSON.parse(sessionStorage.getItem("username")),
            orderItemId:userItems.id
        }
        createOrderItem(orderItemToCreate);
        
       }



let bUserName = sessionStorage.getItem("username")
let nUserName;
if(sessionStorage.getItem("username")){
    nUserName = bUserName.replace(/"/g, "'");
}

 const userItemsBody ={
    userName: nUserName
 }

    useEffect(() => {

                getAllUserItems(userItemsBody).then(
                    res => {
                        
                        const favorites = res.data.map((userItems) => {
    
                                return ({ ...userItems }, 
                                <div key={userItems.id} class="imgdiv" > <img class="image" src={userItems.pictureUrl}></img> 
                                <div> {userItems.title} </div> <br></br><div> {userItems.price} USD </div>
                            <br></br>
                            <div> {userItems.inStock} In Stock </div>          

                            <span class="heartIcon" onClick={() => changeIcon(userItems)} > <FaHeart /> </span>
                            <span class="cartIcon" onClick={() => secondChangeIcon(userItems)} ><BsCartPlus /></span>

                            </div>
                                )
            

                        }
                )

                setNoww(favorites);
                        

                }
                );
            
                },[noww]);



    return (
        <>
            <div className="favPage">

                <div id="favTitle"> <h2 > <img id="imagelogo" src={require('../images/pinkburberry.png')} ></img> My Favorite Items Try Page</h2>
                </div>
                    {noww.length==0? <h1 id="favText" > This favorites list has no items! </h1>: <div class="row" >{noww} </div>}
            </div>
        </>
    )
}


export default FavoriteItems;
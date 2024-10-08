import React from "react";
import Navbar from "../components/Navbar";
import classes from "./FavoriteItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faSadCry } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { useState, useEffect } from "react";
import { getAllItems, getAllOrders, updateItem, updateOrder, createOrder, getAllUsers, getAllUserItems, deleteUserItem,createOrderItem } from "../services/api";
import { BsCartPlus, BsCartDash } from "react-icons/bs"

import FavoriteItem from "./FavoriteItem";

import Home from "./Home";


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

   
    // const secondChangeIcon = (item) => {
    //     var decreaseQuantity = ((enteredQuantity <= item.inStock) ? (item.inStock - enteredQuantity) : (alert("Try To Fill the Quantity Again "), item.quantity));
    //     var increaseQuantity = (((item.inStock) + (enteredQuantity) > item.quantity) ? (item.quantity) : ((item.inStock) + (enteredQuantity)));
    //     const itemToUpdate = {
    //         id: item.id,
    //         title: item.title,
    //         price: item.price,
    //         quantity: item.quantity,
    //         inStock: ((item.cart == 0) ? decreaseQuantity : ((enteredQuantity != null) ? increaseQuantity : (item.quantity))),
    //         pictureUrl: item.pictureUrl,
    //         liked: item.liked,
    //         cart: !item.cart
    //     };
    //     updateItem(itemToUpdate);
    //     if (currentId == null && item.cart == 0) {
    //         orderCreate();
    //     }
    //     else if (currentId != null && item.cart == 0) {
    //         orderUpdate();
    //     }
    // };



    const secondChangeIcon=(userItems)=>{
        const orderItemToCreate = {
            userName:JSON.parse(sessionStorage.getItem("username")),
            orderItemId:userItems.id
        }
        // if (JSON.parse(sessionStorage.getItem("isActive"))==true){
        createOrderItem(orderItemToCreate);
        
       }

//  const userItemsBody ={
//     userName: JSON.parse(sessionStorage.getItem("username"))
//  }

// let bUserName = sessionStorage.getItem("username")
//  let nUserName = bUserName.replace(/"/g, "'");

let bUserName = sessionStorage.getItem("username")
let nUserName;
if(sessionStorage.getItem("username")){
    nUserName = bUserName.replace(/"/g, "'");
}
//  console.log(nUserName)

 const userItemsBody ={
    userName: nUserName
 }
// const userItemsBody ={
//     userId: 2
//  }

    useEffect(() => {

                getAllUserItems(userItemsBody).then(
                    res => {
                        
                        const favorites = res.data.map((userItems) => {
                            // if (userItems.userId == 2){
                                // console.log(sessionStorage.getItem("isActive"))
                                // let x = (bUserName==sessionStorage.getItem("username"))&&(sessionStorage.getItem("isActive"))
                                // console.log("x " + x)

                                // if((bUserName==sessionStorage.getItem("username"))&&(sessionStorage.getItem("isActive")))

                                // if(bUserName==sessionStorage.getItem("username"))
                                // //   if((sessionStorage.getItem("isActive")))
                                // {
                                return ({ ...userItems }, 
                                <div key={userItems.id} class="imgdiv" > <img class="image" src={userItems.pictureUrl}></img> 
                                <div> {userItems.title} </div> <br></br><div> {userItems.price} USD </div>
                            <br></br>
                            <div> {userItems.inStock} In Stock </div>          
                                              {/* <div>Quantity: {userItems.quantity - userItems.inStock}</div><br></br>
                            <span> <label class="labelQF"> Change Quantity : </label>
                                <input required key={userItems.id} class="inputF" type="number"
                                    value={enteredQuantity}
                                    onChange={quantityChangeHandler}
                                >
                                </input>
                            </span> */}

                            {/* <span class="heartIcon" onClick={() => changeIcon(userItems)} >{userItems.liked ? <FaHeart /> : <FaRegHeart />}</span>
                            <span class="cartIcon" onClick={() => secondChangeIcon(userItems)} >{userItems.cart ? <BsCartDash /> : <BsCartPlus />}</span>  */}
                            {/* <div> The Id is here{userItems.id} hhk</div> */}
                            {/* <span class="heartIcon" >{userItems.id==9 ? <FaHeart /> : <FaRegHeart />}</span> */}
                            <span class="heartIcon" onClick={() => changeIcon(userItems)} > <FaHeart /> </span>
                            {/* <span class="cartIcon" onClick={() => secondChangeIcon(userItems)} >{userItems.cart ? <BsCartDash /> : <BsCartPlus />}</span> */}
                            <span class="cartIcon" onClick={() => secondChangeIcon(userItems)} ><BsCartPlus /></span>

                            </div>
                            // <FavoriteItem userItems={userItems} />
                                )
                                // }
                                ////////////////////////////////********************************remove else ********************************** */
                            //     else {
                            //         return ({ ...userItems }, <div key={userItems.id} class="imgdiv" > we are in else section
                            //       </div>
                            //         )          
                            // }
                            //  } 
                    //  return ({ ...userItems },
                    //     <div>hh</div>
                    //     )

                        }
                )
        //         const favorites = res.data.map(userItems => {
        //             return ({ ...userItems },
        //                 <div>hh</div>
        //                 )
        //         }
        // )
                setNoww(favorites);
                        
                // getAllUsers().then(
                //     res => {

                //         const users = res.data.map(user => {

                //             if (user.active == 1) {
                //                 return ({ ...user }, <div>{existingFavProduct} {noww} </div>
                //                 )
                //             } else {
                //                 return null;
                //             }

                //         });
                //         setRegisteredUser(users);

                //     }
                // )

                }
                );
            
                },[noww]);



    return (
        <>
            <div className="favPage">

                <div id="favTitle"> <h2 > <img id="imagelogo" src={require('../images/pinkburberry.png')} ></img> My Favorite Items Try Page</h2>
                {/* {JSON.parse(sessionStorage.getItem("username"))} */}
                </div>


                    {/* {registeredUser} */}

                    {noww.length==0? <h1 id="favText" > This favorites list has no items! </h1>: <div class="row" >{noww} </div>}

{/* 
                <div class="row" >
                    {noww}
                </div> */}


            </div>
        </>
    )
}


export default FavoriteItems;
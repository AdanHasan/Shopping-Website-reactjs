import React from "react";
import { FaHeart, FaRegHeart} from "react-icons/fa"
import classes from "./Home.css";
import { useState, useEffect } from "react";
import {  createOrder, updateOrder , deleteUserItem , createUserItems,createOrderItems,createOrderItem,updateItemQuantity} from "../services/api";


function CloseItem(props) {
      
    const [isHeart, setIsHeart] = useState(false)
    const [inCart, setInCart] = useState(false)
    var enteredOrderDate;
    var x=0;
    useEffect(() => {
    
   });

    const changeHeart = () =>{

        setIsHeart(!isHeart);
        
    const UserItemToDelete = {
        userName: JSON.parse(sessionStorage.getItem("username")),
        id: props.item.id
      }

      const UserItemsToCreate = {
        userName: JSON.parse(sessionStorage.getItem("username")),
        items:[props.item.id]
    }


    if (isHeart==false) {
    createUserItems(UserItemsToCreate)
    }
    else{
        deleteUserItem(UserItemToDelete)
    }
    }


    const changeCart = () =>{
        setInCart(!inCart);
    }


    const getDate=()=>{
        var date = new Date();
       const year = date.toLocaleString("default", {year: "numeric"});
       const month = date.toLocaleString("default", {month: "2-digit"});
       const day = date.toLocaleString("default", {day: "2-digit"});
       var current_date = year + "-" + month + "-" + day;

        enteredOrderDate = current_date;

       }

       const addNew=()=>{ 
        const orderItemToCreate = {
            userName:JSON.parse(sessionStorage.getItem("username")),
            orderItemId:props.item.id
        }
        createOrderItem(orderItemToCreate);
        
       }


    const addOrder=()=>{
        getDate();
        const orderToCreate = {
            userName:JSON.parse(sessionStorage.getItem("username")),
            orderDate : enteredOrderDate,
            shippingAddress: "enteredShippingAddress",
            totalPrice: 100,
            status:"TEMP"
          }
          if(props.item.inStock>0)  {     
            createOrder(orderToCreate);  
            }
            else{
             alert("This item is out of stock!")
            }
    }
    const addItemToCart=()=>{
        const orderItemToCreate = {
            orderId:1,
            quantity:1,
             items:[props.item.id]
        }
        const quantityUpdate={
            id:props.item.id
                }
                if(props.item.inStock>0)  {     
                    createOrderItems(orderItemToCreate);
                    updateItemQuantity(quantityUpdate);   
                    }
                    else{
                     alert("This item is out of stock!")
                    }
    }
            
    const addToCart = () =>{
if(props.arrOfTemps.length==0||props.lastId==undefined) 
{
 addOrder();
    addItemToCart();
}
else{
    getDate();
    const orderToUpdate = {
     id:props.lastId,
     userName:JSON.parse(sessionStorage.getItem("username")),
     orderDate : enteredOrderDate,
     shippingAddress: "enteredShippingAddress",
     totalPrice:19,
     status:"TEMP"
     }
     const orderItemToCreate = {
        orderId:props.lastId,
        items:[props.item.id]
         }

         const quantityUpdate={
            id:props.item.id
                }

                const orderItemToUpdate={
                orderId:props.lastId,
                itemId:props.item.id                     
}
    
       console.log(orderItemToCreate);
       
if(props.item.inStock>0)  {   
    updateOrder(orderToUpdate);
    updateItemQuantity(quantityUpdate);  

    }
    else{
     alert("This item is out of stock!")
    }

}
    }


    return(<>
    <div key={props.item.id} class="imgdiv" >
        <img class="image" src={props.item.pictureUrl}></img> 
        <div> {props.item.title} </div>
     <br></br><div className="tPrice"> {props.item.price} USD </div>
                        <br></br> 
                          <span class="quantityNum">  {props.item.quantity} Quantiny </span>  
                         <br></br> 
                         <br></br><br></br><br></br>
                         <br></br>

                        </div>
    </>)
}
export default CloseItem;
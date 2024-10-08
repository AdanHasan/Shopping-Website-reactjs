import React from "react";
import { FaHeart, FaRegHeart} from "react-icons/fa"
import classes from "./Home.css";
import { useState, useEffect } from "react";
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import { getAllItems, updateItem , createOrder, getAllOrders ,updateOrderItemQuantity, updateOrder , getAllUsers, getAllUserItems, deleteUserItem ,getQantity, createUserItems,createOrderItems,createOrderItem,updateItemQuantity} from "../services/api";

const refresh = () => {
    window.location.reload(true);
  
  }
function Item(props) {
      
    const [isHeart, setIsHeart] = useState(false)
    const [inCart, setInCart] = useState(false)
    var enteredOrderDate;
    var x=0;
    let arr =[];
    useEffect(() => {
        // console.log(props.arrOfOrderItems[0])
        // console.log(props)
// console.log(props.arrOfTemps.length)
// console.log(props.arrOfOrderItems[props.item.id]);
// console.log(props)
// console.log(props.favorites)
  if(props.favorites.includes(props.item.id))
    {
        setIsHeart(true)

    }
    
//     for(let i=0; i<12 ; i++){

//         if(props.arrOfOrderItems[i].id==props.item.id){
            
// arr.push(props.arrOfOrderItems[i].quantity)
//         }
//         else{
//             arr.push(0)

//         }
//     }
    // console.log(arr)
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
        refresh();
    }
    }


    const changeCart = () =>{
        setInCart(!inCart);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const quantityChangeHandler = () => {
    // const body ={
    //     userName:JSON.parse(sessionStorage.getItem("username")),
    //     itemId: props.item.id
    // }
    // const y=getQantity(body);
    // console.log(y)
    // return y;
    // }


    const getDate=()=>{
        var date = new Date();
       const year = date.toLocaleString("default", {year: "numeric"});
       const month = date.toLocaleString("default", {month: "2-digit"});
       const day = date.toLocaleString("default", {day: "2-digit"});
       var current_date = year + "-" + month + "-" + day;

        enteredOrderDate = current_date;
        // console.log(enteredOrderDate)

       }

       const addNew=()=>{ 
        const orderItemToCreate = {
            userName:JSON.parse(sessionStorage.getItem("username")),
            orderItemId:props.item.id
        }
        // if (JSON.parse(sessionStorage.getItem("isActive"))==true){
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
            // orderId:props.lastId,
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
    // createOrderItems(orderItemToCreate);
    updateItemQuantity(quantityUpdate);  
//////////////بدي انو لما اكبس وتقل الكونتي لازم تزيد بصفحة المشتريات
    // if(props.arrOfOrderItems[props.lastId].quantity>=1) {
    //     updateOrderItemQuantity(orderItemToUpdate);

    // }
    // else{
    //     createOrderItems(orderItemToCreate);
    // }
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
                        <br></br><div> {props.item.inStock} In Stock </div> <br></br><br></br><br></br>
                      {/* <span> <label class="labelQuantity">Quantity :</label>  */}
                      {/* <input  required key={props.item.id} class="inputQuantity" type="number"
                      value={enteredQuantity}
                      onChange={quantityChangeHandler}
                     >
               </input> */}
                      {/* </span> */}       
                      {/* <span class="quantityNum">  {props.arrOfOrderItems.quantity} Quantiny </span>  */}

                        {/* <div class="quantityNum" onChange={quantity(props.item.id,JSON.parse(sessionStorage.getItem("username")))}> Quantiny </div>  */}
                        <span class="heartIcon"  onClick={changeHeart}> {isHeart ? <FaHeart /> : <FaRegHeart />} </span>

                        {/* <span class="cartIcon"onClick={changeCart} >{inCart ? <BsCartDash /> : <BsCartPlus />}</span>   */}
                        <span class="cartIcon"onClick={addNew} > <BsCartPlus /></span>  
                        
                        </div>
    </>)
}
export default Item;
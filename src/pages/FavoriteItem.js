import React from "react";
import { FaHeart} from "react-icons/fa"
import classes from "./Home.css";
import { useState } from "react";
import {  deleteUserItems , createUserItems} from "../services/api";


function FavoriteItem(props) {
      
    const [isHeart, setIsHeart] = useState(false)
    const [inCart, setInCart] = useState(false)



const changeIcon = (userItems) => {

    const UserItemsToDelete = {
        id: userItems.id
      }
      deleteUserItems(UserItemsToDelete);
    console.log(UserItemsToDelete)
    console.log(userItems.id)
};

    const changeHeart = () =>{
        setIsHeart(!isHeart);
        
    const UserItemsToDelete = {
        id: props.item.id
      }

      const UserItemsToCreate = {
        userId: 2,
        userName: "adan",
        items:[props.item.id]
    }


    if (isHeart==false) {
    createUserItems(UserItemsToCreate)
    }
    else{
        deleteUserItems(UserItemsToDelete)
    }
    }


    const changeCart = () =>{
        setInCart(!inCart);
    }

    return(<>
   <div key={props.userItems.id} class="imgdiv" > <img class="image" src={props.userItems.pictureUrl}></img> <div> {props.userItems.title} </div> 
   <br></br><div> {props.userItems.price} USD </div>
                            <br></br>
                            <div>Quantity: {props.userItems.quantity - props.userItems.inStock}</div><br></br>
                            <span> <label class="labelQF"> Change Quantity : </label>
                            </span>
                            <span class="heartIcon" onClick={() => changeIcon(props.userItems)} > <FaHeart /> </span>
                            </div>
    </>)
}
export default FavoriteItem;
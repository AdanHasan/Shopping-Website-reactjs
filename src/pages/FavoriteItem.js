import React from "react";
import { FaHeart, FaRegHeart} from "react-icons/fa"
import classes from "./Home.css";
import { useState, useEffect } from "react";
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import { getAllItems, updateItem , createOrder, getAllOrders , updateOrder , getAllUsers, getAllUserItems, deleteUserItems , createUserItems} from "../services/api";


function FavoriteItem(props) {
      
    const [isHeart, setIsHeart] = useState(false)
    const [inCart, setInCart] = useState(false)

//     useEffect(() => {

//     if(props.favorites.includes(props.item.id))
//     {
//         // console.log(props.item.id)
//         setIsHeart(true)

//     }
// });


const changeIcon = (userItems) => {
    // const itemToUpdate = {
    //     id: item.id,
    //     title: item.title,
    //     price: item.price,
    //     quantity: item.quantity,
    //     inStock: item.inStock,
    //     pictureUrl: item.pictureUrl,
    //     liked: !item.liked,
    //     cart: item.cart
    // };
    // updateItem(itemToUpdate);
    const UserItemsToDelete = {
        id: userItems.id
      }
      deleteUserItems(UserItemsToDelete);
    console.log(UserItemsToDelete)
    console.log(userItems.id)
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
                                {/* <input required key={props.userItems.id} class="inputF" type="number"
                                    value={enteredQuantity}
                                    onChange={quantityChangeHandler}
                                >
                                </input> */}
                            </span>
                            {/* <span class="heartIcon" onClick={() => changeIcon(userItems)} >{userItems.liked ? <FaHeart /> : <FaRegHeart />}</span>
                            <span class="cartIcon" onClick={() => secondChangeIcon(userItems)} >{userItems.cart ? <BsCartDash /> : <BsCartPlus />}</span>  */}
                            {/* <div> The Id is here{userItems.id} hhk</div> */}
                            {/* <span class="heartIcon" >{userItems.id==9 ? <FaHeart /> : <FaRegHeart />}</span> */}
                            <span class="heartIcon" onClick={() => changeIcon(props.userItems)} > <FaHeart /> </span>
                            {/* <span class="cartIcon" onClick={() => secondChangeIcon(props.userItems)} >{props.userItems.cart ? <BsCartDash /> : <BsCartPlus />}</span> */}
                            </div>
    </>)
}
export default FavoriteItem;
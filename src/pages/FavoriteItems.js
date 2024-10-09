import React from "react";
import "./FavoriteItems.css";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useState, useEffect } from "react";
import { getAllItems, getAllOrders, updateItem, updateOrder, createOrder, getAllUsers } from "../services/api";
import { BsCartPlus, BsCartDash } from "react-icons/bs"




function FavoriteItems() {

    const [existingFavProduct, setExistingFavProduct] = useState([]);
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [itemPrices, setItemPrices] = useState([]);
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
    const [currentId, setCurrentId] = useState();
    const [registeredUser, setRegisteredUser] = useState([]);


    const [itemQuantity, setItemQuantity] = useState([]);


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

    const changeIcon = (item) => {
        const itemToUpdate = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            inStock: item.inStock,
            pictureUrl: item.pictureUrl,
            liked: !item.liked,
            cart: item.cart
        };
        updateItem(itemToUpdate);
    };


    const secondChangeIcon = (item) => {
        var decreaseQuantity = ((enteredQuantity <= item.inStock) ? (item.inStock - enteredQuantity) : (alert("Try To Fill the Quantity Again "), item.quantity));
        var increaseQuantity = (((item.inStock) + (enteredQuantity) > item.quantity) ? (item.quantity) : ((item.inStock) + (enteredQuantity)));
        const itemToUpdate = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            inStock: ((item.cart == 0) ? decreaseQuantity : ((enteredQuantity != null) ? increaseQuantity : (item.quantity))),
            pictureUrl: item.pictureUrl,
            liked: item.liked,
            cart: !item.cart
        };
        updateItem(itemToUpdate);
        if (currentId == null && item.cart == 0) {
            orderCreate();
        }
        else if (currentId != null && item.cart == 0) {
            orderUpdate();
        }
    };


    useEffect(() => {

        getAllItems().then(

            res => {
                const itemOptions = res.data.map(item => {
                    if (item.liked == 1) {
                        return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
                            {/* <br></br><div> {item.quantity} In Stock </div> */}<br></br>
                            <div>Quantity: {item.quantity - item.inStock}</div><br></br>
                            <span> <label class="labelQF"> Change Quantity : </label>
                                <input required key={item.id} class="inputF" type="number"
                                    value={enteredQuantity}
                                    onChange={quantityChangeHandler}
                                >
                                </input>
                            </span>
                            <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
                            <span class="cartIcon" onClick={() => secondChangeIcon(item)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span> </div>)
                    }
                });
                setExistingFavProduct(itemOptions);

                getAllOrders().then(

                    res => {
                        const identity = res.data.map(order => {
                            if (order.status == "TEMP") {
                                return ({ ...order }, setCurrentId(order.id))

                            }

                        });

                    }

                );


                getAllUsers().then(
                    res => {

                        const users = res.data.map(user => {

                            if (user.active == 1) {
                                return ({ ...user }, <div>{existingFavProduct}</div>
                                )
                            } else {
                                return null;
                            }

                        });
                        setRegisteredUser(users);

                    }

                );
            })

    }, [existingFavProduct]);



    return (
        <>
            <div className="favPage">

                <div id="favTitle"> <h2 > <img id="imagelogo" src={require('../images/pinkburberry.png')} ></img> My Favorite Items</h2>
                </div>


                <div class="row" >
                    {registeredUser}

                </div>



            </div>
        </>
    )
}



export default FavoriteItems;
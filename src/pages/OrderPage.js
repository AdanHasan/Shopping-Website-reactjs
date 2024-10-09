import React from "react";
import Navbar from "../components/Navbar";
import classes from "./OrderList.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import { getAllItems, updateItem, updateOrder, deleteOrder, getAllUsers, getAllOrderItems,getAllOrders, getAllUserItems,getAllOrderIds,deleteAllOrderItems } from "../services/api";
import Item from "./Item";
import TempOrders from "./TempOrders";
import CloseOrders from "./CloseOrders";
import Clos from "./Clos";

function OrderList() {

  const [existingCartItem, setExistingCartItem] = useState([]);
  const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
  const [currentId, setCurrentId] = useState();
  var enteredOrderDate;
  var currentStatus = "TEMP";
  const [enteredQuantity, setEnteredQuantity] = useState();
  const [cartItems, setCartItems] = useState([]);
  var [enteredTotalPrice, setEnteredTotalPrice] = useState([]);
  const [fav, setFav] = useState([]);

  let bUserName = sessionStorage.getItem("username")
  let nUserName;
  if(sessionStorage.getItem("username")){
      nUserName = bUserName.replace(/"/g, "'");
  }
  
    const userItemsBody ={
       userName: nUserName
    }


  const returnToStock = (res) => {
    const items = res.data.map(item => {
      if (item.quantity - item.inStock > 0) {
        return ({ ...item })
      }
    });
    return items;
  }


  useEffect(() => {

    let resTempOrders = [];
    let favorites =[];
    getAllUserItems(userItemsBody).then(

      res => {
           favorites = res.data.map(userItems => {
                        return (
                  userItems.id
              )
              
          }
          )
          setFav(favorites);
        }
        );
  }, []);
   


  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value.split(',').reduce((a, c) => a + (isNaN(+c) ? 0 : +c), 0))

  };


  const moveElement = () => {


    document.getElementById('closeOrders').appendChild(
      document.getElementById('order'));

    var paragraph = document.getElementById("p");
    var text = document.createTextNode(" There Is No Temp Order ");

    paragraph.appendChild(text);

    var x = document.getElementById('payment');
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }


  }


  const getDate = () => {
    var date = new Date();
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    var current_date = year + "-" + month + "-" + day;

    enteredOrderDate = current_date;
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
  };




  const shippingAddressChangeHandler = (event) => {
    setEnteredShippingAddress(event.target.value);

  };

  const orderUpdate = () => {
    getDate();
    const orderToUpdate = {
      id: currentId,
      userId: 1,
      orderDate: enteredOrderDate,
      shippingAddress: enteredShippingAddress,
      totalPrice: 1800,
      status: currentStatus,
      itemId: 3
    }

    if (enteredShippingAddress != "") {
      updateOrder(orderToUpdate);
    }
    else {
      { alert("Please Fill The Shipping Address") }
    }
  }  

  const returnQuantity = () => {

    console.log("qqqq", cartItems)

    for (let i = 0; i <= cartItems.length; i++) {
      const productToUpdate = {
        id: cartItems[i].id,
        title: cartItems[i].title,
        price: cartItems[i].price,

        quantity: cartItems[i].quantity,
        inStock: (cartItems[i].inStock + (cartItems[i].quantity - cartItems[i].inStock)),
        pictureUrl: cartItems[i].pictureUrl,
        liked: 1,
        cart: 0
      };
      let arrOfItems = [productToUpdate]
      updateItem(arrOfItems);
      console.log("sss" + productToUpdate)
    }
  };


  const orderDelete = () => {
    let x = 5;
    const orderToDelete = {
      id: currentId
    }
    deleteOrder(orderToDelete);
    returnQuantity();
    var paragraph = document.getElementById("p");
    var text = document.createTextNode(" There Is No Temp Order ");
    paragraph.appendChild(text);

  }

  const changeStatus = () => {
    currentStatus = "CLOSE";
    orderUpdate();

  }

  function getTotalPrice(e) {
    console.log("priceee", e);
    var sum = 0;
    for (let i = 0; i < existingCartItem.length; i++) {
      sum += existingCartItem[i].price;
    }
    enteredTotalPrice = sum;
  }

  return (

    <>

      <div className="orderListPage">

        <div id="cart">
          <h2 >    <img src={require('../images/shopping-cart.png')} id="cartIcon" alt="cart" ></img> My Cart </h2>
        </div>
                <br></br>
        <p id="p"></p>
  
        <TempOrders favorites={fav}  />
        <br></br>
        <br></br>
        <CloseOrders/>
      </div>



    </>

  );
}

export default OrderList;
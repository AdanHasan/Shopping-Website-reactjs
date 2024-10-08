import React from "react";
import Navbar from "../components/Navbar";
import classes from "./OrderList.css";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { useState, useEffect } from "react";
// import { getAllItems , updateItem , getAllOrders , createOrder , createItem , createUser , updateOrder , deleteOrder} from "../services/api";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { RiDeleteBin6Line, RiEyeCloseFill } from "react-icons/ri";
import Home from "./Home";
import { getAllItems, updateItem, getAllOrders, updateOrder, deleteOrder, getAllUsers } from "../services/api";




//محل كود الابيند
// function DummyComponent(){
//   const [fullList, setFullList] = useState(['item1', 'item2', 'item3', 'item4'])
//   const [favList , setFavList] = useState([]) 

//   const handleFavAddClick=(e)=>{
//       setFavList(preState=>[...preState, e])
//       setFullList(preState=> preState.filter(item => item !== e))
//   }


//   return(
//       <div>
//           Full List (add to fav by clicking them)
//           <ul>
//            {
//                fullList.map(e=> <li key={e} onClick={()=>handleFavAddClick(e)}>{e}</li>)
//            }
//           </ul>

//           Fav List
//           <ul>
//            {
//                favList.map(e=> <li key={e}>{e}</li>)
//            }
//           </ul>
//       </div>
//   )
// }

function OrderList() {

  const [existingCartProduct, setExistingCartProduct] = useState([]);
  const [existingCartItem, setExistingCartItem] = useState([]);

  const [createdTempOrder, setCreatedTempOrder] = useState([]);
  const [createdCloseOrder, setCreatedCloseOrder] = useState([]);

  const [itemPrices, setItemPrices] = useState([]);
  const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
  var [enteredTotalPrice, setEnteredTotalPrice] = useState([]);
  const [currentId, setCurrentId] = useState();
  var enteredOrderDate;
  var currentStatus = "TEMP";
  const [enteredQuantity, setEnteredQuantity] = useState();
  const [registeredUserT, setRegisteredUserT] = useState([]);
  const [registeredUserC, setRegisteredUserC] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //  var deleteIcon = 1;


  const returnToStock = (res) => {
    const items = res.data.map(item => {
      if (item.quantity - item.inStock > 0) {
        return ({ ...item })
      }
    });
    return items;
  }
  

  useEffect(() => {

    getAllItems().then(

      res => {
        const price = res.data.map(item => {
          // if(item.cart == 1){
          if (item.quantity - item.inStock > 0) {
            return ({ ...item }, item.price)
          }
          else {
            return (item.price = 0)
          }

        });
        setItemPrices(price);


        let x = returnToStock(res);
        setCartItems(x);

        const itemOptions = res.data.map(item => {
          // if(item.cart == 1 ){
          if (item.quantity - item.inStock > 0) {
            return ({ ...item }, <div key={item.id} className="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
              {/* <br></br><div> {item.inStock} In Stock </div> */}<br></br>
              <div>Quantity: {item.quantity - item.inStock}</div><br></br>
              {/* <button onClick={()=>returnQuantity(item)}>aa</button> */}

              <span> <label class="labelQ"> Change Quantity : </label>
                <input required key={item.id} class="input" type="number"
                  value={enteredQuantity}
                  onChange={quantityChangeHandler}
                >
                </input>
              </span>
              <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
              <span class="cartIcon" onClick={() => secondChangeIcon(item)}> {item.cart ? <BsCartDash /> : <BsCartPlus />}</span>
            </div>)
          }
          // if(deleteIcon==1){
          //   returnQuantity(item);
          //   deleteIcon=0;
          // }

        });

        setExistingCartItem(itemOptions);

        const productOptions = res.data.map(item => {
          currentStatus = "CLOSE";
          if (item.quantity - item.inStock > 0 && currentStatus == "CLOSE") {

            // if(item.cart == 1 && currentStatus=="CLOSE"){
            return ({ ...item }, <div key={item.id} className="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
              {/* <br></br><div onClick={()=>stockManagement(item)}> {currentQuantity} In Stock </div> */}
              {/* <div>{item.quantity} In Stock</div> */}
              <br></br>
              <div>Quantity: {item.quantity - item.inStock}</div>
            </div>)
          }
          else {
            currentStatus = "CLOSE";

          }
        });

        setExistingCartProduct(productOptions);

        getAllOrders().then(

          res => {

            const identity = res.data.map(order => {
              if (order.status == "TEMP") {
                return ({ ...order }, setCurrentId(order.id))

                // setCurrentId(identity)
              }

            });
            // console.log("identity" , currentId)


            const TempOrders = res.data.map(order => {
              if (order.status == "TEMP") {
                return ({ ...order }, <div key={order.id} class="orderDiv" id="order"> <div key={order.itemId} class="row" >{existingCartItem} </div> <br></br>
                  <form class="orderDetails">
                    {/* <button onClick={()=>returnQuantity(existingCartItem)}>qq</button> */}

                    <label class="orderLabel" onClick={(e) => getTotalPrice(e)}>Total Price : {enteredTotalPrice} USD</label>

                    <br></br> <br></br><label onClick={getDate()} class="orderLabel">Order Date : {enteredOrderDate} </label> <br></br> <br></br>
                    <div> 
                      <label class="orderLabel"> Shipping Address : </label>
                      <input required id="shAddress" type="text"
                        value={enteredShippingAddress}
                        onChange={shippingAddressChangeHandler}
                      >
                      </input></div>

                  </form> <br></br>
                  <button type="submit" id="payment" onClick={changeStatus}> Payment Button  </button>

                  <RiDeleteBin6Line class="trash" onClick={orderDelete} />
                </div>)
              }
            })
            setCreatedTempOrder(TempOrders);

            // else{
            // return ({ ...order }, <div key={order.id} class="orderDiv" id="order"> <div key={order.itemId}  class="row" >{existingCartProduct} </div> <br></br> 
            // <form class="orderDetails">
            // <label onClick={getTotalPrice(itemPrices)}>Total Price : {enteredTotalPrice} USD</label>

            // <br></br> <br></br><label onClick={getDate()}>Order Date : {enteredOrderDate} </label> <br></br> <br></br>  <label 
            // >Shipping Address : {enteredShippingAddress}</label>
            //     </form> <br></br>
            // </div>
            // )

            // }
            const CloseOrders = res.data.map(order => {
              if (order.status == "CLOSE") {
                return ({ ...order }, <div key={order.id} class="orderDiv" id="order"> <div key={order.itemId} class="row" >{existingCartProduct} </div> <br></br>
                  <form class="orderDetails">
                    <label onClick={() => getTotalPrice()} class="orderLabel">Total Price : {enteredTotalPrice} USD</label>

                    <br></br> <br></br><label onClick={getDate()} class="orderLabel">Order Date : {enteredOrderDate} </label> <br></br> <br></br>  <label class="orderLabel"
                    >Shipping Address : {enteredShippingAddress}</label>
                  </form> <br></br>
                </div>
                )

              }

            });
            setCreatedCloseOrder(CloseOrders);



          }

        );

        getAllUsers().then(
          res => {

            const usersT = res.data.map(user => {
              // if(user.active == 1 && currentStatus=="TEMP"){
              currentStatus = "TEMP"
              if (user.active == 1 && currentStatus == "TEMP") {
                return ({ ...user }, <div>{createdTempOrder}</div>
                )
              } else {
                return null;
              }

            });
            setRegisteredUserT(usersT);

            const usersC = res.data.map(user => {
              currentStatus = "CLOSE"
              if (user.active == 1 && currentStatus == "CLOSE") {
                return ({ ...user }, <div>{createdCloseOrder}</div>
                )
              } else {
                return null;
              }

            });
            setRegisteredUserC(usersC);


          })

      }

    );
  }, [existingCartProduct, createdTempOrder]);


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
    // let arrOfItems=[itemToUpdate]
    updateItem(itemToUpdate);
  };


  const secondChangeIcon = (item) => {

    var decreaseQuantity = ((enteredQuantity <= item.inStock) ? (item.inStock - enteredQuantity) : (alert("Try To Fill the Quantity Again "), item.quantity));
    var increaseQuantity = (((item.inStock) + (enteredQuantity) > item.quantity) ? (item.quantity) : ((item.inStock) + (enteredQuantity)));

    const itemToUpdate = {
      id: item.id,
      title: item.title,
      price: item.price,
      // quantity: item.quantity+1,
      quantity: item.quantity,
      inStock: ((item.cart == 0) ? decreaseQuantity : ((enteredQuantity != null) ? increaseQuantity : (item.quantity))),
      pictureUrl: item.pictureUrl,
      liked: item.liked,
      cart: !item.cart
    };
    // let arrOfItems=[itemToUpdate]
    updateItem(itemToUpdate);
  };




  const shippingAddressChangeHandler = (event) => {
    setEnteredShippingAddress(event.target.value);

  };


  //  const createdUser =  () => {

  //     const userToCreate = {
  //       firstName :"adan" ,
  //       lastName: "hasan",
  //       email: "adan@gmail.com" ,
  //       password:"345",
  //       phone:"088503898",
  //       address:"nazareth"
  //   }

  //   createUser(userToCreate);
  //          console.log(userToCreate);
  //   }

  //********** */
  // const orderCreate=() => {
  //  // input for properties with if (order.id==1) dont create another order
  //      const orderToCreate = {
  //       userId:1,
  //     orderDate : enteredOrderDate,
  //     shippingAddress: enteredShippingAddress,
  //     totalPrice:enteredTotalPrice,
  //     status:"TEMP",
  //     itemId:3
  // }

  // createOrder(orderToCreate);
  //        console.log(orderToCreate);


  //     //    setCreatedOrder((prevStudents) => {
  //     //     return [createOrder, ...prevStudents];
  //     // });
  // }


  const orderUpdate = () => {
    getDate();
    const orderToUpdate = {
      id: currentId,
      userId: 1,
      orderDate: enteredOrderDate,
      shippingAddress: enteredShippingAddress,
      //  totalPrice:enteredTotalPrice,
      totalPrice: 1800,
      status: currentStatus,
      itemId: 3
    }

    if (enteredShippingAddress != "") {
      updateOrder(orderToUpdate);
      // moveElement();
    }
    else {
      { alert("Please Fill The Shipping Address") }
    }

    console.log(orderToUpdate);


  }


  const [registeredItem, setRegisteredItem] = useState([])
  //    const returnQuantity = (existingCartItem) => {
  //     console.log("qqqq" + existingCartItem)
  //     const productToUpdate = {
  //       id:existingCartItem,
  //       title: existingCartItem[1],
  //       price: existingCartItem.price,
  //       quantity: existingCartItem.quantity,
  //       inStock: (existingCartItem.quantity-existingCartItem.inStock),
  //       pictureUrl: existingCartItem.pictureUrl,
  //       liked: 1,
  //       cart:0
  //   };
  //     updateItem (productToUpdate);
  // };


  // const returnQuantity = ( existingCartItem) => {
  //   // console.log("qqqq" + existingCartItem)
  //   const productToUpdate = {
  //     id:existingCartItem.id,
  //     title: existingCartItem.title,
  //     price: existingCartItem.price,
  //     quantity: existingCartItem.quantity,
  //     // inStock: (adan.quantity-adan.inStock),
  //     inStock: (existingCartItem.inStock+(existingCartItem.quantity-existingCartItem.inStock)),
  //     pictureUrl: existingCartItem.pictureUrl,
  //     liked: 1,
  //     cart:0
  // };
  //   updateItem (productToUpdate);
  //   console.log("sss" + productToUpdate)

  // };


  const returnQuantity = () => {
    // debugger
    // console.log("eeee",(e.target.parentElement.parentElement.querySelector(".stock").innerHTML).trim().split(" ")[1])
    // let y = (e.target.parentElement.parentElement.querySelector(".stock").innerHTML).trim().split(" ")[1]
    console.log("qqqq", cartItems)
    // console.log("type" , typeof cartItems[0].price)

    for (let i = 0; i <= cartItems.length; i++) {
      // console.log("type" , typeof cartItems[i].price)
      let x = 5;
      const productToUpdate = {
        id: cartItems[i].id,
        title: cartItems[i].title,
        price: cartItems[i].price,

        quantity: cartItems[i].quantity,
        // inStock: (adan.quantity-adan.inStock),
        inStock: (cartItems[i].inStock + (cartItems[i].quantity - cartItems[i].inStock)),
        // inStock: parseInt(existingCartItem[i].inStock)+y,
        pictureUrl: cartItems[i].pictureUrl,
        liked: 1,
        cart: 0
      };

      x = 7;

      // const productToUpdate = [...existingCartItem]


      let arrOfItems = [productToUpdate]
      updateItem(arrOfItems);
      console.log("sss" + productToUpdate)
    }
  };


  const orderDelete = () => {
    // debugger
    let x = 5;
    const orderToDelete = {
      id: currentId
    }
    deleteOrder(orderToDelete);
    returnQuantity();
    // deleteIcon = 1;
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
      {/*       
<button onClick={createdUser}>user</button>

<button onClick={orderUpdate}>update</button> */}




      {/* <button onClick={stockManagement}>payment</button> */}


      <div className="orderListPage">

        <div id="cart">
          <h2 >    <img src={require('../images/shopping-cart.png')} id="cartIcon" alt="cart" ></img> My Cart </h2>
        </div>

        <h1 id="temp"> TEMP ORDERS</h1>
        <br></br>
        <p id="p"></p>


        {/* {existingCartProduct} */}

        {/* {createdTempOrder} */}
        {registeredUserT}


        {/* {existingOr} */}



        <br></br>




        {/* <p id="p"></p> */}


        <br></br>


        <h1 id="close"> CLOSE ORDERS</h1>

        <div id="closeOrders">
        </div>
        {/* {createdCloseOrder} */}
        {registeredUserC}






      </div>




    </>

  );
}

export default OrderList;
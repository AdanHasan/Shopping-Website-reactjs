import React from "react";
import Navbar from "../components/Navbar";
import classes from "./OrderList.css";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { useState, useEffect } from "react";
// import { getAllItems , updateItem , getAllOrders , createOrder , createItem , createUser , updateOrder , deleteOrder} from "../services/api";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { RiDeleteBin6Line, RiEyeCloseFill } from "react-icons/ri";
import Home from "./Home";
import { getAllItems, updateItem, getAllOrders, updateOrder, deleteOrder, getAllUsers,getAllUserItems,getAllOrderIds,getAllOrderItems} from "../services/api";
import Item from "./Item";
import CloseItem from "./CloseItem";




function CloseOrder(props) {

  const [existingItems, setExistingItems] = useState([]);
  const [noww, setNoww] = useState([]);
  const [orderIds, setOrderIds] = useState([]);

  let bUserName = sessionStorage.getItem("username")
  let nUserName;
  if(sessionStorage.getItem("username")){
      nUserName = bUserName.replace(/"/g, "'");
  }
  
    const userItemsBody ={
       userName: nUserName
    }

    useEffect(() => {
     


      getAllOrderIds().then(
        res => {
          const arrOrderIds = res.data.map(orderIds => {
            
            return orderIds;
            
          })
          setOrderIds(arrOrderIds);

        getAllUserItems(userItemsBody).then(
         res => {        
        const favorites = res.data.map(userItems => {
        return (
         userItems.id
          )
                            
          }
        )
        setExistingItems(favorites);

         }
        )
        
        
        for(let i=0; i<arrOrderIds.length ; i++){
          getAllOrderItems(arrOrderIds[i]).then(

          res => {

              const itemOptions = res.data.map((orderItems) => {

                  const temp = {
                      id: orderItems.id,
                      title: orderItems.title,
                      price: orderItems.price,
                      quantity: orderItems.quantity,
                      inStock: orderItems.inStock,
                      pictureUrl: orderItems.pictureUrl,
                      liked: false,
                      cart: false
                  }
                  setNoww(temp)

                  return (
                      temp 
                     )
                      
              });
      
          }

          )
        }
        }


        );

    }, []);



  return (

<>
<p>{props.closeOrder.id}</p>


  <div 
//   key={props.order.id}
   class="orderDiv" id="order"> 
  <div class="row" > 

  <ul>
  {/* {props.arrOfItems.map( (item) => ( */}
    {props.arrOfItems.map( (item) => (
          //  <Item  key={item.id}  item={noww} favorites={existingItems} />
          // <CloseItem item={item} /> 
          // <CloseItem  key={item.id}  item={noww} favorites={existingItems} />   
          // <CloseItem item={item}  /> 
          <CloseItem item={item}  closeOrder={props.closeOrder} /> 

    ))}
    </ul> 


    {/* <ul>
    {props.arrOfItems.map( (item) => (
          <Item  key={item.id}  item={item} favorites={props.favorites} />   
           

    ))}
    </ul>  */}
 </div> 
 <br></br>
                  <form class="orderDetails">
                    {/* <button onClick={()=>returnQuantity(existingCartItem)}>qq</button> */}

                    <label 
                    // onClick={() => getTotalPrice()} 
                    class="orderLabel">Total Price : {props.closeOrder.totalPrice}
                    {/* {enteredTotalPrice} */}
                     USD</label>

                    <br></br> <br></br>
                    <label
                    //  onClick={getDate()} 
                     class="orderLabel">Order Date :{props.closeOrder.orderDate}
                      {/* {enteredOrderDate} */}
                       </label>
                     <br></br> <br></br><div> 
                     <label class="orderLabel"
                    >Shipping Address : {props.closeOrder.shippingAddress}
                    {/* {enteredShippingAddress} */}
                    </label>
                     </div>

                  </form> <br></br>
                  
                </div>

    </>

  );
}

export default CloseOrder;
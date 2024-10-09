import React from "react";
import   "./OrderList.css";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { useState, useEffect } from "react";
import { getAllUserItems,getAllOrderIds,getAllOrderItems} from "../services/api";
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
   class="orderDiv" id="order"> 
  <div class="row" > 

  <ul>
    {props.arrOfItems.map( (item) => (

          <CloseItem item={item}  closeOrder={props.closeOrder} /> 

    ))}
    </ul> 


 </div> 
 <br></br>
                  <form class="orderDetails">

                    <label 
                    class="orderLabel">Total Price : {props.closeOrder.totalPrice}
                     USD</label>

                    <br></br> <br></br>
                    <label
                     class="orderLabel">Order Date :{props.closeOrder.orderDate}
                       </label>
                     <br></br> <br></br><div> 
                     <label class="orderLabel"
                    >Shipping Address : {props.closeOrder.shippingAddress}
                    </label>
                     </div>

                  </form> <br></br>
                  
                </div>

    </>

  );
}

export default CloseOrder;
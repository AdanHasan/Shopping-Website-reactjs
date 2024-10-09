import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllOrderIds,getAllOrderItems,updateOrder,deleteAllOrderItems,deleteOrder,updateOrderStatus,updateOrderShippingAddress} from "../services/api";
import Item from "./Item";
import OrderItem from "./OrderItem";

const refresh = () => {
  window.location.reload(true);

}

function TempOrder(props) {

  const [now, setNow] = useState([]);
  let arrOrderIds =[];
    var enteredOrderDate;
    let arrOfItems = [];
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');

  useEffect(()=> {
              getAllOrderIds().then(

                res => {

                   arrOrderIds = res.data.map(orderId => {
                    return orderId;
                    
                  }
                  )

            
let temp;
let su=0;
                for(let i=0; i<arrOrderIds.length ; i++){
                  getAllOrderItems(arrOrderIds[i]).then(
                res => {  
                        res.data.map((orderItems) => {
                           
                           temp ={
                            id:arrOrderIds[i],
                            price:orderItems.price
                          };
                          su+=orderItems.price
                          arrOfItems.push(temp);

                               
                        });
                        setNow(arrOfItems);
                
                    }
        
            );
                  }

              }
              )

  });

  const getDate=()=>{
    var date = new Date();
   const year = date.toLocaleString("default", {year: "numeric"});
   const month = date.toLocaleString("default", {month: "2-digit"});
   const day = date.toLocaleString("default", {day: "2-digit"});
   var current_date = year + "-" + month + "-" + day;

    enteredOrderDate = current_date;

   }
  const orderUpdate = () => {
    getDate();
    const orderToUpdate = {
      id: props.tempOrder.id,
      userName:JSON.parse(sessionStorage.getItem("username")),
      orderDate: enteredOrderDate,
      shippingAddress: "enteredShippingAddress",
      totalPrice: props.tempOrder.totalPrice,
      status: "CLOSE"
        }

    updateOrder(orderToUpdate);
    console.log(orderToUpdate);
  }

  const shippingAddressChangeHandler = (event) => {
    setEnteredShippingAddress(event.target.value);

  };

  const changeStatus = () => {
    const orderShippingAddres = {
      shippingAddress: enteredShippingAddress
        }

if(props.tempOrder.shippingAddress!="No Address")
{
  updateOrderStatus(props.tempOrder.id);

}
else if(props.tempOrder.shippingAddress=="No Address")
   {
    if(enteredShippingAddress != ""){
      updateOrderShippingAddress(props.tempOrder.id,orderShippingAddres);
      updateOrderStatus(props.tempOrder.id);
    }
    else{
      alert("Please Fill The Shipping Address")
    
    }   }


  }
  const orderItemsDelete = () => {
    const orderIttemsToDelete ={
      id: props.tempOrder.id

    }
    deleteAllOrderItems(orderIttemsToDelete);
    console.log(orderIttemsToDelete);
  }

  const orderDelete = () => {
 

    const orderToDelete = {
      id: props.tempOrder.id
    }
    deleteOrder(orderToDelete);
  }

  const deleteBut = () => {
    orderItemsDelete();
    orderDelete();
  
  }

return(
<>
  <div 
  key={props.tempOrder.id}
  class="orderDiv" id="order"> 
  <div class="row" > 

  <ul>
    {props.arrOfItems.map( (item) => (
      <>
           <OrderItem item={item} favorites={props.favorites} tempOrder={props.tempOrder} /> 
</>
    ))}
    </ul> 


 </div> 
 <br></br>
                  <form class="orderDetails">
                    <label class="orderLabel" >Total Price : {props.tempOrder.totalPrice}  USD</label>
                    <br></br> <br></br><label class="orderLabel">Order Date : {props.tempOrder.orderDate} </label>
                     <br></br> <br></br>

                      <div> 
                      <label class="orderLabel"> Shipping Address :  </label>
                      <input required id="shAddress" type="text"
                        value={enteredShippingAddress}
                        onChange={shippingAddressChangeHandler}
                      >
                      </input></div>

                  </form> <br></br>

                   <button type="submit" id="payment" onClick={changeStatus}> Payment Button  </button>

                 <RiDeleteBin6Line class="trash" onClick={deleteBut} />
                </div>

    </>

  );
}

export default TempOrder;
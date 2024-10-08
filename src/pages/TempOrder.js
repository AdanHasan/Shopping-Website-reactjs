import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllUserItems,getAllOrderIds,getAllOrderItems,updateOrder,deleteAllOrderItems,deleteOrder,updateOrderStatus,updateOrderShippingAddress} from "../services/api";
import Item from "./Item";
import OrderItem from "./OrderItem";

const refresh = () => {
  window.location.reload(true);

}

function TempOrder(props) {

  const [now, setNow] = useState([]);
  let arrOrderIds =[];
    let resItems =[];
    var [enteredTotalPrice, setEnteredTotalPrice] = useState([]);
    var enteredOrderDate;
    let arrOfItems = [];
    let trySum=0;
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');

  //  setNow(props.arrOfItems);
  useEffect(()=> {
    //  console.log("START!!!!!!!!!")

    // console.log(props)


              getAllOrderIds().then(

                res => {

                   arrOrderIds = res.data.map(orderId => {
                    return orderId;
                    
                  }
                  )

                  // setOrderIds(arrOrderIds);

                // console.log(arrOrderIds)

                
            
let temp;
let su=0;
let arrOfPrice = [];
let secondTemp;


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
                        // resItems.push(arrOfItems);
                        setNow(arrOfItems);
                
                    }
        
            );
      //  console.log(now[0]);
      // //  console.log(now[1]);
      // //  console.log(now[2]);
      // //  console.log(now[3]);
      // //  console.log(now[4]);
      // console.log(now[0]);
      // console.log(now[0]);

    //   console.log(now[i].id);
    //  if(now[i].id==1)
    //   {
    //    su+=now[i].price
    //    arrOfPrice.push(su)
    //  }
    //   console.log(arrOfPrice)

              // su+=now[i].price
              // arrOfPrice.push(su)
              // console.log(arrOfPrice)
                  }
                // console.log(arrOfItems);

                // for(let i=0; i<now.length ; i++){
                //   for(let j=0; j<now[i].id ; j++){
                //     // trySum+=now[i].price
                //     // console.log(now[i])


                //   }
                // }
                // console.log(trySum);

                //  resItems.push(arrOfItems);
                //  console.log(resItems);
              }
              )

  });

      //  console.log(props)

  const getDate=()=>{
    var date = new Date();
   const year = date.toLocaleString("default", {year: "numeric"});
   const month = date.toLocaleString("default", {month: "2-digit"});
   const day = date.toLocaleString("default", {day: "2-digit"});
   var current_date = year + "-" + month + "-" + day;

    enteredOrderDate = current_date;
    // console.log(enteredOrderDate)

   }
  // const orderUpdate = () => {
  //   getDate();
  //   const orderToUpdate = {
  //     id: props.tempOrder.id,
  //     userName:JSON.parse(sessionStorage.getItem("username")),
  //     orderDate: enteredOrderDate,
  //     shippingAddress: "enteredShippingAddress",
  //     //  totalPrice:enteredTotalPrice,
  //     totalPrice: props.tempOrder.totalPrice,
  //     status: "CLOSE"
  //       }

  //   // if (enteredShippingAddress != "") {
  //   //   updateOrder(orderToUpdate);
  //   //   // moveElement();
  //   // }
  //   // else {
  //   //   { alert("Please Fill The Shipping Address") }
  //   // }
  //   updateOrder(orderToUpdate);
  //   console.log(orderToUpdate);
  // }
  const orderUpdate = () => {
    getDate();
    const orderToUpdate = {
      id: props.tempOrder.id,
      userName:JSON.parse(sessionStorage.getItem("username")),
      orderDate: enteredOrderDate,
      shippingAddress: "enteredShippingAddress",
      //  totalPrice:enteredTotalPrice,
      totalPrice: props.tempOrder.totalPrice,
      status: "CLOSE"
        }

    // if (enteredShippingAddress != "") {
    //   updateOrder(orderToUpdate);
    //   // moveElement();
    // }
    // else {
    //   { alert("Please Fill The Shipping Address") }
    // }
    updateOrder(orderToUpdate);
    console.log(orderToUpdate);
  }





  const shippingAddressChangeHandler = (event) => {
    setEnteredShippingAddress(event.target.value);

  };

  const changeStatus = () => {
    // orderUpdate();
    const orderShippingAddres = {
      shippingAddress: enteredShippingAddress
        }
console.log(props.tempOrder.shippingAddress!="No Address")
//     if(enteredShippingAddress != ""||){
//       updateOrderShippingAddress(props.tempOrder.id,orderShippingAddres);
//       updateOrderStatus(props.tempOrder.id);

//     }

// else{
//   alert("Please Fill The Shipping Address")

// }

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

 
    // returnQuantity();
    // // deleteIcon = 1;
    // var paragraph = document.getElementById("p");
    // var text = document.createTextNode(" There Is No Temp Order ");
    // paragraph.appendChild(text);

  }

  const orderDelete = () => {
 

    const orderToDelete = {
      id: props.tempOrder.id
    }
    deleteOrder(orderToDelete);
    console.log(orderToDelete);

    // returnQuantity();
    // // deleteIcon = 1;
    // var paragraph = document.getElementById("p");
    // var text = document.createTextNode(" There Is No Temp Order ");
    // paragraph.appendChild(text);
  }

  const deleteBut = () => {
    orderItemsDelete();
    orderDelete();
    // returnQuantity();
    // // deleteIcon = 1;
    // var paragraph = document.getElementById("p");
    // var text = document.createTextNode(" There Is No Temp Order ");
    // paragraph.appendChild(text);

  }
  // console.log(now);

// let enteredTotalPrice=1;
  // function getTotalPrice(e) {
  //   // console.log("priceee", e);
  //   var sum = 0;
  //   for (let i = 0; i < now.length; i++) {
  //     console.log(now)
  //     for(let j=0; j< now.id; j++){
  //       console.log(now.id)

  //     sum += now[i].price;
  //   }
  // }
  //   enteredTotalPrice = sum;
  // }

  // function getTotalPrice() {
  //   // console.log("priceee", e);
  //   var sum = 5;
  //   setEnteredTotalPrice(sum)
  // }
  // var sum = 5;

  // const returnToStock  = () => {
  //    sum = 6;
  //   setEnteredTotalPrice(sum)
  // }


return(
<>
  <div 
  key={props.tempOrder.id}
  class="orderDiv" id="order"> 
  {/* {props.tempOrder.id} */}
  <div class="row" > 

  <ul>
    {props.arrOfItems.map( (item) => (
      <>
          {/* <Item  key={item.id}  item={item} favorites={props.favorites} />    */}
           <OrderItem item={item} favorites={props.favorites} tempOrder={props.tempOrder} /> 
</>
    ))}
    </ul> 


 </div> 
 <br></br>
                  <form class="orderDetails">
                    {/* <button onClick={()=>returnQuantity(existingCartItem)}>qq</button> */}

                    <label class="orderLabel" >Total Price : {props.tempOrder.totalPrice}  USD</label>
                    {/* <label class="orderLabel" onClick={() => getTotalPrice()}>Total Price : {enteredTotalPrice} USD</label> */}
                    {/* <label class="orderLabel" >The Right Total Price : {trySum}  USD</label> */}

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
                  {/* <button type="submit"  > Payment Button  </button> */}

                  {/* <RiDeleteBin6Line class="trash" /> */}

                   <button type="submit" id="payment" onClick={changeStatus}> Payment Button  </button>

                 <RiDeleteBin6Line class="trash" onClick={deleteBut} />
                </div>

    </>

  );
}

export default TempOrder;
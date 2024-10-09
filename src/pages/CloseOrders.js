import React from "react";
import { FaHeart, FaRegHeart} from "react-icons/fa"
import classes from "./Home.css";
import { useState, useEffect } from "react";
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import {getAllOrderIds,getAllItems, updateItem , createOrder, getAllOrders , getAllOrderItems,updateOrder , getAllUsers, getAllUserItems, deleteUserItems , createUserItems} from "../services/api";
import CloseOrder from "./CloseOrder";

function CloseOrders(props) {
      
    const [createdCloseOrder, setCreatedCloseOrder] = useState([]);
    const [closeOrders, setCloseOrders] = useState([]);
    const [orderIds, setOrderIds] = useState([]);
    const [existingItems, setExistingItems] = useState([]);


    const [currentItems, setCurrentItems] = useState([]);
    let bUserName = sessionStorage.getItem("username")
    let nUserName;
    if(sessionStorage.getItem("username")){
        nUserName = bUserName.replace(/"/g, "'");
    }
    
      const userItemsBody ={
         userName: nUserName
      }
    // useEffect(() => {
    //   let resCloseOrders = [];

    //     getAllOrders().then(

    //         res => {

    //            res.data.map(order => {
              
    //             if (order.status == "CLOSE") {
    //               const temp = {
    //                 id:order.id,
    //                 userId:order.userId,
    //                 orderDate:order.orderDate,
    //                 shippingAddress:order.shippingAddress,
    //                 totalPrice:order.totalPrice,
    //                 status:order.status
    //                             }
    //               resCloseOrders.push(temp);

    //             }
    //           });
    //           setCreatedCloseOrder(resCloseOrders)
    //         }
  
    //       );
    //     }, [createdCloseOrder]);
// let resItems =[];
//         useEffect(() => {
//       let resCloseOrders = [];

//         getAllOrders().then(

//             res => {

//                res.data.map(order => {
              
//                 if (order.status == "CLOSE") {
//                   const temp = {
//                     id:order.id,
//                     userName:order.userName,
//                     orderDate:order.orderDate,
//                     shippingAddress:order.shippingAddress,
//                     totalPrice:order.totalPrice,
//                     status:order.status
//                                 }
//                   resCloseOrders.push(temp);

//                 }
//               });
//               setCreatedCloseOrder(resCloseOrders);
//               console.log(resCloseOrders);
//               // console.log(createdCloseOrder);

//          for(let i=0; i<createdCloseOrder.length ; i++){
//           getAllOrderItems(createdCloseOrder[i].id).then(
//           res => {
//         //  console.log("The iiiiiiiiiiiiiii is"+` ${JSON.stringify(i)}`);

//         let arrOfItems = [];
//               res.data.map((orderItems) => {
//                   const temp = {
//                       id: orderItems.id,
//                       title: orderItems.title,
//                       price: orderItems.price,
//                       quantity: orderItems.quantity,
//                       inStock: orderItems.inStock,
//                       pictureUrl: orderItems.pictureUrl,
//                       liked: false,
//                       cart: false
//                   };
//                       arrOfItems.push(temp);
                      
                      
//               });
//               resItems.push(arrOfItems);
//               setCurrentItems(resItems);
//               console.log(currentItems);
      
//           }

//     );
//         }
//             }
  
//           );
//         }, [createdCloseOrder]);
useEffect(() => {
  getAllOrders()
    .then((res) => {
      const resTempOrders = res.data.filter((order) => order.status === "CLOSE"&& order.userName==JSON.parse(sessionStorage.getItem("username"))&&JSON.parse(sessionStorage.getItem("isActive")));
      
      return { 
        resTempOrders, 
        orderIdsPromise: getAllOrderIds() 
      };
    })

    .then(({ resTempOrders, orderIdsPromise }) => {
      return orderIdsPromise.then((orderIdsRes) => {
        const arrOrderIds = orderIdsRes.data;
        
        const itemPromises = arrOrderIds.map((orderId) => 
          getAllOrderItems(orderId).then((res) => 
            res.data.map((item) => ({ 
              ...item, 
              liked: false, 
              cart: false 
            }))
          )
        );

        return Promise.all(itemPromises).then((resItems) => {
          setCurrentItems(resItems);
          setCloseOrders(resTempOrders);
          setOrderIds(arrOrderIds);

          return getAllUserItems(userItemsBody);
        });
      });
    })
    .then((userItemsRes) => {
      const favorites = userItemsRes.data.map((userItem) => userItem.id);
      setExistingItems(favorites);
    })
    .catch((err) => console.error("An error occurred", err));

}, [closeOrders]);


    return(

    

         <>
         {closeOrders.length==0?null:        <h1 id="close"> CLOSE ORDERS</h1>
}
          

      {closeOrders.map((cO,index) =>
      <>
         <CloseOrder key={cO} 
         closeOrder={cO}
arrOfItems={currentItems[closeOrders[index].id-1]===undefined ? null : currentItems[closeOrders[index].id-1]}

           /> 


         

         </>
        )}
  
      </>

    )
}

export default CloseOrders;
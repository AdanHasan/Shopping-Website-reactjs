import React from "react";
import { useState, useEffect } from "react";
import { getAllOrders, getAllUserItems,getAllOrderIds,getAllOrderItems} from "../services/api";
import TempOrder from "./TempOrder";
import Clo from "./Clo";

function Clos() {
      
    const [tempOrders, setTempOrders] = useState([]);
    const [existingItems, setExistingItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
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
        getAllOrders()
          .then((res) => {
            const resTempOrders = res.data.filter((order) => order.status === "CLOSE"&& order.userName==JSON.parse(sessionStorage.getItem("username")));

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
                setTempOrders(resTempOrders);
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

      }, []);


      // console.log(tempOrders[0].id)
//     useEffect(() => {
//     let resTempOrders = [];
//     let arrOrderIds=[];
//     let resItems = [];

//         getAllOrders().then((res) => {

//               res.data.map(order => {

//                 if (order.status == "TEMP") {
//                   const temp = {
//                     id:order.id,
//                     userId:order.userId,
//                     orderDate:order.orderDate,
//                     shippingAddress:order.shippingAddress,
//                     totalPrice:order.totalPrice,
//                     status:order.status
//                                 };
//                     resTempOrders.push(temp);
              
//                 }

//               });
//               // setTempOrders(resTempOrders);

//               getAllOrderIds().then(

//                 res => {

//                    arrOrderIds = res.data.map(orderId => {
//                     return orderId;
                    
//                   }
//                   )
//                   // setOrderIds(arrOrderIds);

//                 // console.log(arrOrderIds)

//                 }
//                 )

//                 for(let i=0; i<arrOrderIds.length ; i++){
//                   getAllOrderItems(arrOrderIds[i]).then(
//                   res => {
//                 //  console.log("The iiiiiiiiiiiiiii is"+` ${JSON.stringify(i)}`);

//                 let arrOfItems = [];
//                       res.data.map((orderItems) => {
//                           const temp = {
//                               id: orderItems.id,
//                               title: orderItems.title,
//                               price: orderItems.price,
//                               quantity: orderItems.quantity,
//                               inStock: orderItems.inStock,
//                               pictureUrl: orderItems.pictureUrl,
//                               liked: false,
//                               cart: false
//                           };
//                               arrOfItems.push(temp);
                              
                             
//                       });
//                       resItems.push(arrOfItems);
//                       // setCurrentItems(resItems);
//                       console.log(resItems);
              
//                   }
        
//             );
//                 }
// let favorites=[]
//                getAllUserItems(userItemsBody).then(
//                res => {        
//                favorites = res.data.map(userItems => {
//               return (
//                userItems.id
//                 )
                                  
//                 }
//               )
//               setExistingItems(favorites);
      
//                }
//               )
              
          


//             })
//             setTempOrders(resTempOrders);
//             setOrderIds(arrOrderIds);
//             setCurrentItems(resItems);

//         }, []);
       
        // console.log(orderIds)

    return(

// order 
 <>
    {tempOrders.map((tO,index) =>
   
  <>
       <Clo key={tO} tempOrder={tO} 
        // arrOfItems={currentItems[index]===undefined ? null : currentItems[index]}
        arrOfItems={currentItems[tempOrders[index].id-1]===undefined ? null : currentItems[tempOrders[index].id-1]}
        // arrOfItems={currentItems[index]===undefined ? null : currentItems[index]}

        favorites={existingItems}
        /> 
    </>
    )
}
</>
    )
    
}
export default Clos;
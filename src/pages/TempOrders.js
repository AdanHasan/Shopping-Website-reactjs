import React from "react";
import { useState, useEffect } from "react";
import { getAllOrders, getAllUserItems,getAllOrderIds,getAllOrderItems} from "../services/api";
import TempOrder from "./TempOrder";

function TempOrders() {
      
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
            const resTempOrders = res.data.filter((order) => order.status === "TEMP"&& order.userName==JSON.parse(sessionStorage.getItem("username"))&&JSON.parse(sessionStorage.getItem("isActive")));
            
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

      }, [tempOrders]);

    return(

 <>
          {tempOrders.length==0? <><h1 id="temp"> TEMP ORDERS</h1>
          <h3 id="temp" style={{textAlign: "center"}}> THERE ARE NO TEMP ORDERS</h3></>:         <h1 id="temp"> TEMP ORDERS</h1>

}
    {tempOrders.map((tO,index) =>
   
  <>
       <TempOrder key={tO} tempOrder={tO}
        arrOfItems={currentItems[tempOrders[index].id-1]===undefined ? null : currentItems[tempOrders[index].id-1]}

        favorites={existingItems}
        /> 
    </>
    )
}
</>
    )
    
}
export default TempOrders;

import React from "react";
import Navbar from "../components/Navbar";
import { getAllItems, updateItem , createOrder, getAllOrders ,getAllOrderIds, updateOrder , getAllUsers, getAllUserItems, deleteUserItem ,getQantity,  deleteUser,createUserItems,getAllUserNames,getAllOrderItems} from "../services/api";
import { useState, useEffect } from "react";
import {Link , json, useMatch , useResolvedPath} from "react-router-dom";
import classes from "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faCartPlus, faCartMinus } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
// import {BsCartPlus} from "bootstrap-icons";
import FavoriteItems from "./FavoriteItems";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { render } from "@testing-library/react";
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import {user} from "../components/registration/Login";
import Item from "./Item";
import OrderItem from "./OrderItem";





function Home() {


    const [itemPrices , setItemPrices]=useState([]);
    const [enteredShippingAddress , setEnteredShippingAddress]=useState('');
    const [currentId, setCurrentId] = useState(); 

    const [enteredQuantity , setEnteredQuantity]=useState();
    const [itemQuantity , setItemQuantity]=useState([]);

    const [homeItems, setHomeItems] = useState([]);
    const [registeredUser , setRegisteredUser]=useState([]);
    const [createdTempOrder , setCreatedTempOrder]=useState([]);
    const [registeredItems , setRegisteredItems]=useState([]);
    const[enteredTotalPrice,setEnteredTotalPrice]=useState(0);
    const [sumPrice , setSumPrice]=useState(0);
    const [cartChanged , setCartChanged]=useState(0);

    // const [inFav , setInFav]=useState(false);

    var enteredOrderDate;

    const [existingItems, setExistingItems] = useState([]);
    const [noww, setNoww] = useState([]);
    const [arrOrderItems, setArrOrderItems] = useState([]);

    const [temps, setTemps] = useState([]);

    let bUserName = sessionStorage.getItem("username")
    let nUserName;
    if(sessionStorage.getItem("username")){
        nUserName = bUserName.replace(/"/g, "'");
    }

   //  console.log(nUserName)
   
    const userItemsBody ={
       userName: nUserName
    }

    const [currentItems, setCurrentItems] = useState([]);

// console.log("orginal"+nUserName)

// useEffect(() => {
//   getAllUserItems(userItemsBody)
//     .then((res) => {
//       // const resTempOrders = res.data.filter((order) => order.status === "CLOSE"&& order.userName==JSON.parse(sessionStorage.getItem("username")));
//       const resTempOrders = res.data.filter((order) => order.status === "CLOSE"&& order.userName==JSON.parse(sessionStorage.getItem("username")));
//       const favorites = res.data.map(userItems)
                        
//       return { 
//         // resTempOrders, 
//         favorites,
//         orderIdsPromise: getAllOrders() 
//       };
//     })

//     .then(({ favorites, orderIdsPromise }) => {
//       // return orderIdsPromise.then((orderIdsRes) => {
//         return orderIdsPromise.then((order) => {

//         // const arrOrderIds = orderIdsRes.data;
//        const arrOfTemps = order.data.map((order)=>order.status == "TEMP"&&order.userName==JSON.parse(sessionStorage.getItem("username")));

//         const itemPromises = arrOrderIds.map((orderId) => 
//           getAllOrderItems(orderId).then((res) => 
//             res.data.map((item) => ({ 
//               ...item, 
//               liked: false, 
//               cart: false 
//             }))
//           )
//         );

//         return Promise.all(itemPromises).then((resItems) => {
//           setCurrentItems(resItems);
//           setTempOrders(resTempOrders);
//           setOrderIds(arrOrderIds);

//           return getAllUserItems(userItemsBody);
//         });
//       });
//     })
//     .then((userItemsRes) => {
//       const favorites = userItemsRes.data.map((userItem) => userItem.id);
//       setExistingItems(favorites);
//     })
//     .catch((err) => console.error("An error occurred", err));

// }, []);


//     useEffect(() => {
// // let arrUserNames=[];
// let favorites =[];
// let arrOfTemps= [];
// let arrOfOrderItems = [];
// let arrOfItems =[];
// let arrOfOrders=[];


//                   getAllUserItems(userItemsBody).then(

//                     res => {
//                          favorites = res.data.map(userItems => {
                        
//                           return (
//                                 userItems.id
//                             )
                            
//                         }
//                         )
//                         setNoww(favorites);


//                     getAllOrders().then(

//                       res => {

//                          arrOfTemps= res.data.map(order => {
//                           if(order.status == "TEMP"&&order.userName==JSON.parse(sessionStorage.getItem("username"))){
//                             return (order.id )
                  
//                           }
                       
//                         });

//                          setCreatedTempOrder(arrOfTemps);

//                          arrOfOrders= res.data.map(order => {
//                           const orderBody ={
//                             id:order.id,
//                             userName:order.userName,
//                             orderDate:order.orderDate,
//                             shippingAddress:order.shippingAddress,
//                             totalPrice:order.totalPrice,
//                             status:order.status
//                           }
                    
                       
//                         });

//                       }
                    
//                     );

//                 for(let i=0; i<arrOfTemps.length ; i++){

//                   getAllOrderItems(arrOfItems[i]).then(
//                   res => {
//                       res.data.map((orderItems) => {
//                           const temp = {
//                              orderId:createdTempOrder[i],
//                               itemId: orderItems.id,
//                               quantity:orderItems.quantity
//                           };
//                           arrOfItems.push(temp);
                                   
//                       });

//                       arrOfOrderItems.push(arrOfItems);
//                   }
        
//             );
//                 }
//         getAllItems().then(

//             res => {
//                 const itemOptions = res.data.map((item) => {

//                     const temp = {
//                         id:item.id,
//                         title: item.title,
//                         price: item.price,
//                         quantity: item.quantity,
//                         inStock: item.inStock,
//                         pictureUrl: item.pictureUrl,
//                         liked: false,
//                         cart: false
//                     }
//                     return (
//                       <>
//                         <Item item={temp} favorites={favorites}  arrOfTemps={arrOfTemps} lastId={currentId} arrOfOrderItems={arrOfOrderItems} arrOfOrders={arrOfOrders}/>
//                         </>
//                         )
                      
//                 });
                
//                 setExistingItems(itemOptions);


//             })
       
                

//   getAllUsers().then(

// res => {
//   const users= res.data.map(user => {

//           if(user.username==JSON.parse(sessionStorage.getItem("username"))){

//         return (
//             <>
// <div class="row">{existingItems}</div>    
//     </>
//         )
//       }
   
//     });
// setRegisteredUser(users);    
//   }
  
//   );
//             }

//        );

//     }, [existingItems ]);

useEffect(() => {
  // let arrUserNames=[];
  let favorites =[];
  let arrOfTemps= [];
  let arrOfOrderItems = [];
  let arrOfItems =[];
  let arrOfOrders=[];
  
  
                    getAllUserItems(userItemsBody)
                    .then((res) => {
                           favorites = res.data.map((userItems) => userItems.id);
                           setNoww(favorites);
  
  return{
    favorites,allOrdersPromise:getAllOrders()
  };})
  .then(({favorites,allOrdersPromise}) => {
    return allOrdersPromise.then((allOrdersRes) => {
      arrOfTemps= allOrdersRes.data.map(order => {
        if(order.status == "TEMP"&&order.userName==JSON.parse(sessionStorage.getItem("username"))){
          return (order.id )

        }
     
      });  
    //   const itemPromises = arrOfTemps.map((orderId) => 
    //   getAllOrderItems(orderId).then((res) => 
    //   arrOfOrderItems= res.data.map((item) => ({ 
    //       ...item, 
    //       liked: false, 
    //       cart: false 
        
    //     }))

    //   )
    // );

    const itemPromises = arrOfTemps.map((orderId) => 
    getAllOrderItems(orderId).then((res) => 
    arrOfOrderItems= res.data.map((item) => ({ 
    
        ...item, 
        liked: false, 
        cart: false 
 
      })
      )
    )
  );

    return Promise.all(itemPromises).then((resItems) => {
      setCurrentItems(resItems);
      setNoww(favorites);
            setTemps(arrOfTemps);
            setArrOrderItems(arrOfOrderItems)

// return getAllUserItems(userItemsBody);
    });


      });
  }
  )
  // .then((userItemsRes) => {
  //   const favorites = userItemsRes.data.map((userItem) => userItem.id);
  //   setExistingItems(favorites);
  // })
  .catch((err) => console.error("An error occurred", err));

          getAllItems().then(
  
              res => {
                  const itemOptions = res.data.map((item) => {
  
                      const temp = {
                          id:item.id,
                          title: item.title,
                          price: item.price,
                          quantity: item.quantity,
                          inStock: item.inStock,
                          pictureUrl: item.pictureUrl,
                          liked: false,
                          cart: false
                      }
                      return (
                        // <>
                        //  {res.data.map((index) =>
                        <>
                          <Item item={temp}  favorites={favorites} arrOfTemps={arrOfTemps} lastId={currentId} arrOfOrderItems={arrOrderItems} arrOfOrders={arrOfOrders}/>
                          </>
                        //  )}
                        //   </>
                          )
                        
                  });
                  
                  setExistingItems(itemOptions);
  
  
              })
         
                  
  
    getAllUsers().then(
  
  res => {
    const users= res.data.map(user => {
  
            if(user.username==JSON.parse(sessionStorage.getItem("username"))){
  
          return (
              <>
  <div class="row">{existingItems}</div>    
      </>
          )
        }
     
      });
  setRegisteredUser(users);    
    }
    
    );



  
      }, [existingItems]);
  // console.log("try")
  // console.log(temps)     
        
    return (

        <>
<br></br>
<br></br>
<h2 class="qoute">Sunglasses are like eye shadow: They make everything look younger and pretty.</h2>
            {/* <h2 class="qoute">NEW HOME 
            </h2> */}
{/* <button onClick={deleted}>DELETE</button> */}
            <span>
                {/* <div class="row"  > */}

                    {registeredUser}
                {/* </div> */}

            </span>


        </>
    );

}

function CustomLink({to , children , ...props}){
    const resolvedPath=useResolvedPath(to)
    const isActive=useMatch({path:resolvedPath.pathname , end:true});
  
    return(
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}> 
        {children}
        </Link>
      </li>
    )
  }


export default Home;
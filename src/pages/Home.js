import React from "react";
import Navbar from "../components/Navbar";
import { getAllItems, updateItem , createOrder, getAllOrders , updateOrder , getAllUsers} from "../services/api";
import { useState, useEffect } from "react";
import {Link , useMatch , useResolvedPath} from "react-router-dom";
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


    var enteredOrderDate;





const [existingItems, setExistingItems] = useState([]);

    useEffect(() => {

        getAllItems().then(

            res => {

                const price= res.data.map(item => {
                    // if(item.cart == 1){
                        if(item.quantity-item.inStock > 0 ){
                      return ({ ...item } , item.price)
                    
                    }
                    else{
                     return(0)

                    }
                  
                  });
                  setItemPrices(price);
                //   console.log("priceeeeeeee" + itemPrices );

                  const quantity= res.data.map(item => {
                    // if(item.cart == 1){
                      return ({ ...item } , item.quantity-item.inStock)
                  
                  });
                  setItemQuantity(quantity);
                //   console.log("quantityyy" + itemQuantity );


                const itemOptions = res.data.map(item => {

// console.log("sumPrice is" , sumPrice)
                    return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div className="tPrice"> {item.price} USD </div>
                        <br></br><div> {item.inStock} In Stock </div> <br></br><br></br><br></br>
                      <span> <label class="labelQuantity">Quantity :</label> 
                      <input  required key={item.id} class="inputQuantity" type="number"
                      value={enteredQuantity}
                      onChange={quantityChangeHandler}
                     >
               </input>
                      </span>
                        <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
                        <span class="cartIcon"onClick={(e) => secondChangeIcon(item,e)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span>  </div>)

                });
                setExistingItems(itemOptions);


const items = res.data.map(item=> {
                    return ({ ...item }, <div  key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
                        <br></br><div> {item.inStock} In Stock </div> <br></br><br></br><br></br>
                      <span> <label class="labelQuantity">Quantity :</label> 
                      <input  required key={item.id} class="inputQuantity" type="number"
                      value={enteredQuantity}
                      onChange={quantityChangeHandler}
                     >
               </input>
                      </span>
                         {/* <span > <Link to="/login" class="linkh" ><FaRegHeart id="heartIcon" /></Link></span>
                        <span ><Link to="/login"  class="linkh"><BsCartPlus id="cartPlusIcon" /></Link></span>  */}
                        <span class="heartIcon" onClick={() => loginAlert()} > <FaRegHeart  /></span>
                        <span class="cartIcon" onClick={() => loginAlert()}><BsCartPlus/></span>
                        </div>) 

                });
                setHomeItems(items);

           

                
 getAllOrders().then(

    res => {
    const identity= res.data.map(order => {
        if(order.status == "TEMP"){
          return ({ ...order } , setCurrentId(order.id))

        }
     
      });
      const aa= res.data.map(order => {
        if(order.status == "TEMP"){
          return ({ ...order } )

        }
     
      });
       setCreatedTempOrder(aa);
     
    }
  
  );

  getAllUsers().then(

//     res => {
//     const users= res.data.map(user => {
//         if(!JSON.parse(localStorage.getItem("isActive"))){
//           return ({ ...user } , <div class="row">{homeItems}</div>)

//         }
//         else{
//             return <div class="row">{existingItems}</div> ;
//         }
     
//       });
// setRegisteredUser(users);    
//     }

res => {
  const users= res.data.map(user => {
      // if(!JSON.parse(localStorage.getItem("isActive"))){
        if(!JSON.parse(sessionStorage.getItem("isActive"))){

        return ({ ...user } , <div class="row">{homeItems}</div>)

      }
      else{
          return <div class="row">{existingItems}</div> ;
      }
   
    });
setRegisteredUser(users);    
  }
  
  );


            }


       );

    }, [existingItems ]);


   const loginAlert = () => {
    alert("Please Login To Continue")
   }

    const quantityChangeHandler = (event) => {
    
        setEnteredQuantity(event.target.value.split(',').reduce((a, c) => a + (isNaN(+c) ? 0 : +c), 0))
     
    
    };
    
    function getTotalPrice(newPrice) {
        
        // console.log("priceeee" , newPrice)
        var sum = parseFloat(newPrice);

        console.log("priceeee" , typeof sum)

        for(let i=0 ; i<existingItems.length ; i++){
            console.log("vvv" ,existingItems[i])
            if(existingItems[i]&&existingItems[i].price){
        // sum += itemPrices[i] ;
       console.log(  existingItems[i].price)
        sum +=  existingItems[i].price ;

         console.log("-------"  , sum,existingItems[i].price )
            }
        
        }
        setEnteredTotalPrice (sum);

        console.log("aaaaaaaaaa"  , sum )

      }



      const getDate=()=>{
        var date = new Date();
       const year = date.toLocaleString("default", {year: "numeric"});
       const month = date.toLocaleString("default", {month: "2-digit"});
       const day = date.toLocaleString("default", {day: "2-digit"});
       var current_date = year + "-" + month + "-" + day;

        enteredOrderDate = current_date;

       }
  
       const orderUpdate=(newPrice) => {
        getDate();
        getTotalPrice(newPrice)
    const student = createdTempOrder.find(order => {
        return order.itemId
    });
  
    const studentCourse = existingItems.find(item => {
        return item.id === student;
    });

  
    const orderToUpdate = {
        id:currentId,
       userId:1,
     orderDate : enteredOrderDate,
     shippingAddress: enteredShippingAddress,
     totalPrice:enteredTotalPrice,
     status:"TEMP",
     itemsId:student.id
 }
   
       updateOrder(orderToUpdate);
              console.log(orderToUpdate);
     
       }

    const orderCreate=(newPrice) => {
      getTotalPrice(newPrice);
      getDate();
      const orderToCreate = {
        userId:1,
      orderDate : enteredOrderDate,
      shippingAddress: enteredShippingAddress,
      totalPrice: enteredTotalPrice,
      status:"TEMP",
      itemsId:3
    }
 
       createOrder(orderToCreate);
  
              console.log(orderToCreate);
       }


    const changeIcon = (item) => {
    const itemToUpdate = {
        id:item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        pictureUrl: item.pictureUrl,
        liked: !item.liked,
        cart: item.cart
    };
    updateItem (itemToUpdate);
};


    const secondChangeIcon = (item , e) => {
      // debugger
        setCartChanged((prev)=>{return prev+1})
        let currentPrice=(e.target.parentElement.parentElement.querySelector(".tPrice").innerHTML).trim().split(" ")[0]
        console.log("eeee",(e.target.parentElement.parentElement.querySelector(".tPrice").innerHTML).trim().split(" ")[0])
// var increaseQuantity=item.quantity+1;
//   var decreaseQuantity=((item.quantity > 0) ? (item.quantity-1) : (alert(item.title + "Is Not Available Now"), item.quantity=0));
// ((item.cart==0) ? decreaseQuantity : increaseQuantity)
console.log(enteredQuantity);
var decreaseQuantity=((enteredQuantity<=item.inStock) ? (item.inStock-enteredQuantity) :(alert("Try To Fill the Quantity Again "),item.quantity));
var increaseQuantity=(((item.inStock)+(enteredQuantity)>item.quantity)?(item.quantity):((item.inStock)+(enteredQuantity)));

        const itemToUpdate = {
            id:item.id,
            title: item.title,
            price: item.price,
            // inStock:((enteredQuantity<=item.inStock) ? (item.inStock-enteredQuantity) :(alert("hhhh")) ) ,
            // inStock: decreaseQuantity ,
            quantity: 10,
            // inStock: ((item.cart==0) ? decreaseQuantity : increaseQuantity) ,
            inStock: ((item.cart==0) ? decreaseQuantity : ((enteredQuantity!=null) ? increaseQuantity :(item.quantity) )) ,
            pictureUrl: item.pictureUrl,
            liked: item.liked,
            cart: !item.cart
        };

        updateItem (itemToUpdate);        
   
  
    if( currentId==null && item.cart==0) {
    orderCreate(currentPrice);
}
else if (currentId!=null && item.cart==0 ){
    orderUpdate(currentPrice);
}

    };
        
    return (

        <>
            <img src={require('../images/wallpaper2.jpg')} alt="burberry" class="img"></img>

            <h2 class="qoute">Sunglasses are like eye shadow: They make everything look younger and pretty.</h2>

            <span>
                <div class="row" >
                    {registeredUser}
                </div>

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
import React from "react";
import Navbar from "../components/Navbar";
import { getAllItems} from "../services/api";
import { useState, useEffect } from "react";
import {Link , useMatch , useResolvedPath} from "react-router-dom";
import "./MainPage.css";
import FavoriteItems from "./FavoriteItems";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"
import { BsCartPlus , BsCartDash , BsCart} from "react-icons/bs"
import {user} from "../components/registration/Login";
import Item from "./Item";



function MainPage() {

    const [enteredQuantity , setEnteredQuantity]=useState();
    const [homeItems, setHomeItems] = useState([]);
    const [registeredUser , setRegisteredUser]=useState([]);
    const [itemPrices , setItemPrices]=useState([]);
    const [itemQuantity , setItemQuantity]=useState([]);


    useEffect(() => {

              
        getAllItems().then(

            res => {

                const price= res.data.map(item => {
                        if(item.quantity-item.inStock > 0 ){
                      return ({ ...item } , item.price)
                    }
                    else{
                     return(0)
                    }
                  });
                  setItemPrices(price);
                  const quantity= res.data.map(item => {
                      return ({ ...item } , item.quantity-item.inStock)
                  
                  });
                  setItemQuantity(quantity);


const items = res.data.map(item=> {
                    return ({ ...item }, <div  key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img>
                     <div> {item.title} </div> <br></br><div> {item.price} USD </div>
                        <br></br><div> {item.inStock} In Stock </div> <br></br><br></br><br></br>
                        <span class="heartIcon" onClick={() => loginAlert()} > <FaRegHeart  /></span>
                        <span class="cartIcon" onClick={() => loginAlert()}><BsCartPlus/></span>
                        </div>) 
                });
                setHomeItems(items);
            })

        }, [ homeItems]);

   const loginAlert = () => {
    alert("Please Login To Continue")
   }

    const quantityChangeHandler = (event) => {
    
        setEnteredQuantity(event.target.value.split(',').reduce((a, c) => a + (isNaN(+c) ? 0 : +c), 0))
    };
    
    return (

        <>
            <img src={require('../images/wallpaper2.jpg')} alt="burberry" class="img"></img>

<h2 class="qoute">Sunglasses are like eye shadow: They make everything look younger and pretty.</h2>

            <span>
                <div class="ro"  >
                    {homeItems}
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


export default MainPage;
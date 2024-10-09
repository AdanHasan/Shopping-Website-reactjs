import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { getAllItems, updateItem, createOrder, updateOrder, getAllUsers,getAllUserItems } from "../services/api";
import { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SecondSearchBar from "./SecondSearchBar";
import { BsCartPlus } from "react-icons/bs"
import {  FaRegHeart } from "react-icons/fa";
import Item from "../pages/Item";



const moveToSearch = () => {
    var y = document.getElementById('searchItems');
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "block";
    }
}


const hide = () => {
    var y = document.getElementById('titles');
    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "none";
    }
}



function SearchBar() {

    const [existingItems, setExistingItems] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [matchingItem, setMatchingItem] = useState([]);
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [itemPrices, setItemPrices] = useState([]);
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
    const [currentId, setCurrentId] = useState();

    const [itemQuantity, setItemQuantity] = useState([]);
    const [searchItemsL, setSearchItemsL] = useState([]);
    const [registeredUser, setRegisteredUser] = useState([]);
    const [noww, setNoww] = useState([]);


    let bUserName = sessionStorage.getItem("username")
    let nUserName;
    if(sessionStorage.getItem("username")){
        nUserName = bUserName.replace(/"/g, "'");
    }
   
    const userItemsBody ={
       userName: nUserName
    }



    var enteredTotalPrice = 0;
    var enteredOrderDate;


    const quantityChangeHandler = (event) => {
        setEnteredQuantity(event.target.value.split(',').reduce((a, c) => a + (isNaN(+c) ? 0 : +c), 0))

    };


    const getDate = () => {
        var date = new Date();
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
        var current_date = year + "-" + month + "-" + day;

        enteredOrderDate = current_date;

    }

    const orderCreate = () => {

        getDate();

        const orderToCreate = {
            userId: 1,
            orderDate: enteredOrderDate,
            shippingAddress: enteredShippingAddress,
            totalPrice: enteredTotalPrice,
            status: "TEMP",
            itemId: 3
        }

        createOrder(orderToCreate);

        console.log(orderToCreate);


    }



    const orderUpdate = () => {
        getDate();

        const orderToUpdate = {
            id: currentId,
            userId: 1,
            orderDate: enteredOrderDate,
            shippingAddress: enteredShippingAddress,
            totalPrice: enteredTotalPrice,
            status: "TEMP",
            itemId: 3
        }

        updateOrder(orderToUpdate);
        console.log(orderToUpdate);

    }


    useEffect(() => {
        getAllItems().then(
            res => {
                const items = res.data.map(item => {
                    return ({ ...item })
                });
                setExistingItems(items);
            }
        );
    }, []);


    const changeIcon = (item) => {
        const itemToUpdate = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            inStock: item.inStock,
            pictureUrl: item.pictureUrl,
            liked: !item.liked,
            cart: item.cart
        };
        updateItem(itemToUpdate);
    };


    const secondChangeIcon = (item) => {
        var decreaseQuantity = ((enteredQuantity <= item.inStock) ? (item.inStock - enteredQuantity) : (alert("Try To Fill the Quantity Again "), item.quantity));
        var increaseQuantity = (((item.inStock) + (enteredQuantity) > item.quantity) ? (item.quantity) : ((item.inStock) + (enteredQuantity)));
        const itemToUpdate = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            inStock: ((item.cart == 0) ? decreaseQuantity : ((enteredQuantity != null) ? increaseQuantity : (item.quantity))),
            pictureUrl: item.pictureUrl,
            liked: item.liked,
            cart: !item.cart
        };
        updateItem(itemToUpdate);
        if (currentId == null && item.cart == 0) {
            orderCreate();
        }
        else if (currentId != null && item.cart == 0) {
            orderUpdate();
        }
    };

    const ifFunc =() =>{
        console.log("dgs")
        { if(!(sessionStorage.getItem("username")))
        {
            return <div class="row"> {searchItemsL}</div>;
    
        }
       }
    }


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = existingItems.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(existingItems)
        }

    }


    const loginAlert = () => {
        alert("Please Login To Continue")
    }


    const inputItems = (item) => {
        setSearchInput((item.title))
    };

    useEffect(() => {
        getAllUserItems(userItemsBody).then(
            res => {
                
                const favorites = res.data.map(userItems => {
                
                    return (
                        userItems.id
                    )
                    
                }
                )
                setNoww(favorites);

        getAllItems().then(

            res => {
                const itemOptions = res.data.map(item => {

                    if (searchInput == item.title) {

                        return ({ ...item }, 
                       <Item item={item} favorites={favorites} />
                            )
                    }
             
                });

                setMatchingItem(itemOptions);


                const itemsToSearch = res.data.map(item => {

                    if (searchInput == item.title) {
                        return ({ ...item },

                         <div key={item.id} class="imgdiv" style={{ marginTop: 150 }} ><img style={{ width: 250, height: "auto" }} class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
                            {/* <br></br><div> {item.quantity} In Stock </div> */}<br></br>
                            <div>Quantity: {item.quantity - item.inStock}</div><br></br>
                            <span> <label class="labelQS"> Change Quantity : </label>
                                <input required key={item.id} class="inputS" type="number"
                                    value={enteredQuantity}
                                    onChange={quantityChangeHandler}
                                >
                                </input>
                            </span>
                            <span class="heartIcon" onClick={() => loginAlert()} > <FaRegHeart /></span>
                            <span class="cartIcon" onClick={() => loginAlert()} > <BsCartPlus /></span> </div>
                            
                            )
                    }
                
            });
                setSearchItemsL(itemsToSearch);

            })
                getAllUsers().then(

                    res => {
                        const users = res.data.map(user => {
                                if(user.username==JSON.parse(sessionStorage.getItem("username"))){
                                return ({ ...user }, <div class="row" style={{marginLeft: "0px"}} >{matchingItem}</div>)
                            } 
                        });
                        setRegisteredUser(users);
                    }

                );
              

            }

        )

    }, [matchingItem, searchItemsL]);

  

    return (
        <>



            <Link to="/SecondSearchBar" >  <input className="searchbar" type="text" id="myInput" placeholder="Search" name="search" value={searchInput} onChange={(e) => searchItems(e.target.value)} onClick={moveToSearch} ></input> <div type="submit" className="btn" > <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /> </div> </Link>


            <div id="searchItems" >

                {(searchInput.length > 0)&&(filteredResults.length!=0) ? (

                    filteredResults.map((item) => {
                        return (
                            <>

                                <br></br>
                                <div className="titleSearch"  onClick={() => {inputItems(item);
                               hide(); }} key={item.id}>{item.title}</div>

                            </>
                        )
                    })

                    
                    )

                 :

                <div> not found!</div>
                }
                {registeredUser}



            </div>



        </>
    )

}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default SearchBar;
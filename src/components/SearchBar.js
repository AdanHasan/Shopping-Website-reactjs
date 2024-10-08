import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { getAllItems, updateItem, createOrder, updateOrder, getAllUsers,getAllUserItems } from "../services/api";
// import { Card, Input } from 'react-card-component'
import { useState, useEffect } from "react";
import { classes as a } from "../components/SearchBar.css";
import { classes as b } from "../components/Navbar";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SecondSearchBar from "./SecondSearchBar";
import { text } from "@fortawesome/fontawesome-svg-core";
import { BsCartPlus, BsCartDash } from "react-icons/bs"
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";
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

// const moveToSearch = () => {
//     var y = document.getElementsByClassName('titleSearch');
//     if (y.style.display === "inlline" ) {
//         y.style.display = "none";
//       } else {
//         y.style.display = "none";
// }
// }


function SearchBar() {

    const [existingItems, setExistingItems] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [matchingItem, setMatchingItem] = useState([]);
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [itemPrices, setItemPrices] = useState([]);
    const [enteredShippingAddress, setEnteredShippingAddress] = useState('');
    const [currentId, setCurrentId] = useState();

    //  var [enteredTotalPrice , setEnteredTotalPrice]=useState([]);
    const [itemQuantity, setItemQuantity] = useState([]);
    const [searchItemsL, setSearchItemsL] = useState([]);
    const [registeredUser, setRegisteredUser] = useState([]);
    const [noww, setNoww] = useState([]);

    // const [filteredData, setFilteredData] = useState([]);

    let bUserName = sessionStorage.getItem("username")
    let nUserName;
    if(sessionStorage.getItem("username")){
        nUserName = bUserName.replace(/"/g, "'");
    }
   //  console.log(nUserName)
   
    const userItemsBody ={
       userName: nUserName
    }


//  var  filteredData;

    var enteredTotalPrice = 0;
    //    var enteredTotalPrice ;
    var enteredOrderDate;

    // const [searchInput, setSearchInput] = useState([]);

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
        // let arrOfItems=[itemToUpdate]
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
        // let arrOfItems=[itemToUpdate]
        updateItem(itemToUpdate);
        if (currentId == null && item.cart == 0) {
            // getTotalPrice(itemPrices,itemQuantity);
            orderCreate();
        }
        else if (currentId != null && item.cart == 0) {
            // getTotalPrice(itemPrices,itemQuantity);
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
 

    //     useEffect(() => {

    //         getAllItems().then(

    //             res => {
    //                 const itemOptions = res.data.map(item => {
    //                     if(searchInput == item.title){
    //                     return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
    //                         <br></br><div> {item.quantity} In Stock </div>
    //                         <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
    //                         <span class="cartIcon"onClick={() => secondChangeIcon(item)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span> </div>)
    //              }});
    //              setMatchingItem(itemOptions);

    //          }

    //      );

    //  }, [matchingItem]);




    // const searchItems = (searchValue) => {
    //     setSearchInput(searchValue)
    //     if (searchInput !== '') {
    //         const filteredData = existingItems.filter((item) => {
    //             return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         // console.log("filterd")
    //         // console.log(filteredData)
    //         setFilteredResults(filteredData)
    //     }
    //     else {
    //         setFilteredResults(existingItems)
    //     }

    // }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = existingItems.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            // console.log("filterd")
            // console.log(filteredData)
            // console.log(filteredData.length==0)
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(existingItems)
        }

    }


    //   const inputItems = (text) => {
    //     // setSearchInput({searchInput: {text}})

    //     setSearchInput(`${text}`)
    //     alert("aaaaaaaaa");

    // };

    const loginAlert = () => {
        alert("Please Login To Continue")
    }


    const inputItems = (item) => {
        // setSearchInput({searchInput: {text}})

        // setSearchInput(`${item.title}`)
        setSearchInput((item.title))
    };

    useEffect(() => {
        getAllUserItems(userItemsBody).then(
            res => {
                
                const favorites = res.data.map(userItems => {
                
                    // return ({ ...userItems })
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
                        // if (Object.values(item.title).join('').toLowerCase().includes(searchInput.toLowerCase())) {

                        return ({ ...item }, 
                            
                        // <div key={item.id} class="imgdiv" style={{ marginTop: 150 }} ><img style={{ width: 250, height: "auto" }} class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
                        //     {/* <br></br><div> {item.quantity} In Stock </div> */}<br></br>
                        //     <div>Quantity: {item.quantity - item.inStock}</div><br></br>
                        //     <span> <label class="labelQS"> Change Quantity : </label>
                        //         <input required key={item.id} class="inputS" type="number"
                        //             value={enteredQuantity}
                        //             onChange={quantityChangeHandler}
                        //         >
                        //         </input>
                        //     </span>
                        //     <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
                        //     <span class="cartIcon" onClick={() => secondChangeIcon(item)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span> </div>
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
                            // if (user.active == 0) {
                                if(user.username==JSON.parse(sessionStorage.getItem("username"))){
                                return ({ ...user }, <div class="row" style={{marginLeft: "0px"}} >{matchingItem}</div>)
                            } 
                            // else  if(JSON.parse(sessionStorage.getItem("isActive"))==false){
                            //     return <div class="row">{searchItemsL} {sessionStorage.getItem("isActive")} </div>;
                            // } 

                            // else {
                                // return <div class="row"> {searchItemsL}</div>;
                            // }

                            // else{
                            //     ifFunc();
                            // }

                        });
                        setRegisteredUser(users);
                    }

                );
              

            }

        )

    }, [matchingItem, searchItemsL]);

  

    return (
        <>

            {/* <Link to="/SecondSearchBar" >  <input  className="searchbar"  type="text"   id="myInput"  placeholder="Search" name="search"  value={searchInput}  onChange={(e) =>{searchItems(e.target.value) ; inputItems(e.target.value)}} onClick={moveToSearch} ></input> <div type="submit" className="btn" > <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /> </div> </Link>  */}



            {/* <Link to="/SecondSearchBar" >  <input  className="searchbar"  type="text"   id="myInput"  placeholder="Search" name="search"   onChange={(e) => searchItems(e.target.value)} onClick={moveToSearch} ></input> <button type="submit" className="btn" style={{marginBottom:30,borderWidth:30 , background:"red" , backgroundSize:20}}> <FontAwesomeIcon  icon={faMagnifyingGlass} /> </button> </Link>  */}
            <Link to="/SecondSearchBar" >  <input className="searchbar" type="text" id="myInput" placeholder="Search" name="search" value={searchInput} onChange={(e) => searchItems(e.target.value)} onClick={moveToSearch} ></input> <div type="submit" className="btn" > <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} /> </div> </Link>

            {/* <button type="submit" className="btn" > <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>   */}

            <div id="searchItems" >
                {/* {filteredData} */}
                {/* {filteredData.length==0?<div>Emptyyyyyyyyyyyyy</div>:} */}
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
                //  (
                //     existingItems.map((item) => {
                //         return (
                //             <>
                //                 <br></br>
                //                 {/* <div className="titleSearch" onClick={() => inputItems(item)} key={item.id}>{item.title}</div> */}

                //             </>
                //         )
                //     })
                // )
                <div> not found!</div>
                }
                {/* {matchingItem} */}
                {registeredUser}



            </div>


            {/* {matchingItem} */}

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
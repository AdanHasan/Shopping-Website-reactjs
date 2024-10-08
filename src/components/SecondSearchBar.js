import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { getAllItems, updateItem } from "../services/api";
// import { Card, Input } from 'react-card-component'
import { useState, useEffect } from "react";
// import {classes as a }from "../components/SearchBar.css";
// import classes from "../components/Navbar.css";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import Navbar from "./Navbar";
// import Home from "../pages/Home";
// import {classes as b} from "../pages/Home.css";
import { BsCartPlus, BsCartDash } from "react-icons/bs"
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"




function SecondSearchBar() {

    // //     const [existingItems, setExistingItems] = useState([]);
    //     const [filteredResults, setFilteredResults] = useState([]);
    //     // const [searchInput, setSearchInput] = useState('');

    // const [existingItems, setExistingItems] = useState([]);
    // const [searchInput, setSearchInput] = useState('');
    // const [matchingItem, setMatchingItem] = useState([]);

    // //     useEffect(() => {
    // //         getAllItems().then(
    // //             res => {
    // //                 const items = res.data.map(item => {
    // //                     return ({...item})
    // //                 });
    // //                 setExistingItems(items);

    // //             }
    // //         );
    // //     }, []);

    //     // const courseChangeHandler = (event) => {
    //     //     var enteredCourse = event.target.value
    //     //     setEnteredCourse(enteredCourse);
    //     //     const selectedCourse = props.courses.find(course => {
    //     //         return course.name.toString() === enteredCourse.toString();
    //     //     });
    //     //     setEnteredDate(selectedCourse.startDate);
    //     // }




    //   const searchItems = (searchValue) => {
    //       setSearchInput(searchValue)
    //       if (searchInput !== '') {
    //           const filteredData = existingItems.filter((item) => {
    //               return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //           })
    //           setFilteredResults(filteredData)
    //       }
    //       else{
    //           setFilteredResults(existingItems)
    //       }
    //   }


    // const changeIcon = (item) => {
    //     const itemToUpdate = {
    //         id:item.id,
    //         title: item.title,
    //         price: item.price,
    //         quantity: item.quantity,
    //         pictureUrl: item.pictureUrl,
    //         liked: !item.liked,
    //         cart: item.cart
    //     };
    //     updateItem (itemToUpdate);
    // };


    // const secondChangeIcon = (item) => {
    //     const itemToUpdate = {
    //         id:item.id,
    //         title: item.title,
    //         price: item.price,
    //         quantity: item.quantity,
    //         pictureUrl: item.pictureUrl,
    //         liked: item.liked,
    //         cart: !item.cart
    //     };
    //     updateItem (itemToUpdate);
    // };

    // useEffect(() => {
    //     getAllItems().then(
    //         res => {
    //             const items = res.data.map(item => {
    //                 return ({ ...item })
    //             });
    //             setExistingItems(items);

    //         }
    //     );
    // }, []);

    // function InputItems  (item)  {
    //     // setSearchInput({searchInput: {text}})

    //     // setSearchInput(`${item.title}`)
    //     setSearchInput((item.title))
    // };
    // useEffect(()=>{
    //     getAllItems().then(

    //         res => {
    //             const itemOptions = res.data.map(item => {

    //                 if(searchInput == item.title){
    //                 return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={item.pictureUrl}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
    //                     <br></br><div> {item.quantity} In Stock </div>
    //                     <span class="heartIcon" onClick={() => changeIcon(item)} >{item.liked ? <FaHeart /> : <FaRegHeart />}</span>
    //                     <span class="cartIcon"onClick={() => secondChangeIcon(item)} >{item.cart ? <BsCartDash /> : <BsCartPlus />}</span> </div>)
    //         }});
    //          setMatchingItem(itemOptions);

    //      }

    //  )

    // }, [matchingItem]);






    // // function myFunction() {
    // //     const returnItem = existingItems.map((item) => {
    // //         return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={require('../images/sun1.webp')}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
    // //         <br></br><div> {item.quantity} In Stock </div>
    // //          </div>)
    // //     });

    // //     // const returnItem = 'zzzzzz'

    // // setMatchingItem([...returnItem])


    // //   }


    // // const deleteByValue  = value => {
    // //     setMatchingItem(oldValues => {
    // //       return oldValues.filter(item => item !== value)

    // //     })
    // //     const returnItem = existingItems.map((item) => {
    // //                 return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={require('../images/sun1.webp')}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
    // //              <br></br><div> {item.quantity} In Stock </div>
    // //               </div>)
    // //          });
    // //     setMatchingItem(returnItem)
    // //   }


    // // function inputItems  (item )  {
    //     // setSearchInput({searchInput: {text}})

    //     // setSearchInput(`${item.title}`)
    //     // setSearchInput((item.title))

    //         // const returnItem = existingItems.map((item) => {
    //         //     return ({ ...item }, <div key={item.id} class="imgdiv" ><img class="image" src={require('../images/sun1.webp')}></img> <div> {item.title} </div> <br></br><div> {item.price} USD </div>
    //         //     <br></br><div> {item.quantity} In Stock </div>
    //         //      </div>)
    //         // });

    //         //     setExistingItems(returnItem);


    // // };




    return (
        <>



            {/* {
                    existingItems.map((item) => {
                        return (
                            <>
                                <br></br>
                                <div className="titleSearch"  onClick={() => InputItems(item )} key={item.id}>{item.title}</div>
                                { <div  value={matchingItem}  onClick={() => inputItems(item)}>click</div> }

                            </>
                        )
                    })}  */}
            {/* 

           <form  > 
          
       

          <input  className="searchbar" type="text"   id="myInput"    value={searchInput}   placeholder="Search" name="search"  onChange={(e) => searchItems(e.target.value) } ></input>  
        
             <button type="submit" className="faIcon" >    <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>   


             <div class="searchItems">
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                           <>
                           
                           <br></br>
                                    <div className="titleSearch"  onClick={() => InputItems(item )} key={item.id}>{item.title}</div>
                                   
                                    </>
                        )
                    })
                ) : (
                    existingItems.map((item) => {
                        return (
                            <>
                                  <br></br>
                                    <div  className="titleSearch" onClick={() => InputItems(item )} key={item.id}>{item.title}</div>
                               
                            
                            </>
                        )
                    })
                )}
            </div> 
                

{matchingItem}



        </form>      */}

        </>
    )

}

export default SecondSearchBar;
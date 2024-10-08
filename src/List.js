
import { React, useState } from 'react'
import data from "./ListData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function List(props) {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <>
        <form  > 
 
<input  className="searchbar" type="text"   id="myInput"    placeholder="Search" name="search"  onChange={(e) => inputHandler(e.target.value)} ></input>  

   <button type="submit" className="faIcon" >    <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>  

</form>

     {/* <div>
           <List input={inputText} />
         </div> */}
         
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
        </>
        
        )
}

export default List



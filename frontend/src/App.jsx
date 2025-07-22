import React,{ useState, useEffect } from 'react'
import './App.css'
import DropDown from './dropdown'
import Search from './search.jsx'
import axios from 'axios'




function App() {
const [selectedOption, setSelectedOption] = useState([]);
//console.log({selectedOption});
const [query,setQuery] = useState([""]);


const selectedOptions = selectedOption.map(option => option.label).join(', ');
const selectedValue = selectedOption.map(option => option.value).join(',');
const searchQuery = query;


  const payload = {
    values: selectedOption,
    querries: searchQuery,
    valuesString: selectedValue,
  }

// Need to work on this part
  const sendingData = async()=>{
  const response = await axios.post("http://localhost:5000/api", payload);
  console.log(response.data);
  /*console.log(response.data["school.name"]);
  if(typeof response.data["school.name"]=== 'string'){
    console.log(`1`);
  };*/
}
// Need to work on this part


const handleChange2 = (event)=>{
  event.preventDefault();
  window.location.reload();
}


  return (
    <div>
      <DropDown selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
      < Search query = {query} setQuery = {setQuery}/>
      <button onClick = {sendingData} type = "submit"> Submit </button>
      <button onClick = {handleChange2} type = "reset"> Reset </button>      
    </div>
  )
}

export default App

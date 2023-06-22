import React, { useState, useContext,useRef,useEffect } from 'react';
import "./App.css"
import axios from "axios"
import { PlaceContext } from "./Contexts/PlaceContext";
import { PageContext } from "./Contexts/PageContext";
let places = [];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const {setPlaceName}=useContext(PlaceContext);
  const {setpage}=useContext(PageContext);


  // const {userName,setUserName}=useContext(LoginContext);
  axios.get('https://aiweb-80256-default-rtdb.firebaseio.com/.json')
  .then(function(response) {
    const data = response.data;
    places=Object.keys(data)
  })
  .catch(function(error) {
    console.error('Error retrieving data:', error);
  });


  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredSuggestions = places.filter(place =>
      place.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
  };

  const handleSelect = (value) => {
    setSearchTerm(value);
    setSuggestions([]);
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };
  return (
    <div className="search-bar">
      {/* <div>{userName}</div> */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a place..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions" ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="suggestion"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {places.includes(searchTerm)?
      
        <button onClick={(e)=>{
          if(places.includes(searchTerm)){setPlaceName(searchTerm);
            setpage(2)
          }
          else{alert("enter proper city name")}
          e.preventDefault()
        }}>Plan Trip</button>:<button>Plan-Trip</button>}
      
      <div>
        <button onClick={(e)=>{setpage(3);e.preventDefault()}}>test button</button>
      </div>
    </div>
  );
};

export default SearchBar;
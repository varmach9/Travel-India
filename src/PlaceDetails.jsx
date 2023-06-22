import { useState,useContext,useRef,useEffect } from "react";
import Map from "./Map";
import Weather from "./Weather"
import { PlaceContext } from "./Contexts/PlaceContext";
import {Codes} from "./utilities/AirportCodes"
import "./App.css"
const PlaceDetails = () => {
  const [showform,setshowform]=useState(1)
  const [source,setsource]=useState("")
  const [sourcesetter,setsourcesetter]=useState("")
  const [days,setdays]=useState(3)
  const [dayssetter,setdayssetter]=useState(3)
  const [startdate,setstartdate]=useState("03-07-2023")
  const [startdatesetter,setstartdatesetter]=useState("03-07-2023")
  const { placeName } = useContext(PlaceContext);
  
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const places=Object.keys(Codes)

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
  
  const handleChange = (event) => {
    const value = event.target.value;
    setsourcesetter(value);
    const filteredSuggestions = places.filter(place =>
      place.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
    console.log(suggestions.length)
    event.preventDefault()
  };
  const handleSelect = (value) => {
    setsourcesetter(value);
    setSuggestions([]);
    // value.preventDefault()
  };
  // console.log(Object.keys(Codes))
  return <div>
    {showform===1?<div>
      <div>
        <form onSubmit={(e)=>{
          setsource(sourcesetter)
          setstartdate(startdatesetter)
          setdays(dayssetter)
          setshowform(0)
          e.preventDefault()
        }}>
          <div className="search-bar">
          <label>Enter Source Location</label>
          <input type="text" value={sourcesetter} onChange={handleChange} ref={suggestionsRef}></input>
          
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
      )}</div>
      <div></div>
          <label>Enter No of days</label>
          <input type="Integer" value={dayssetter} onChange={(e)=>{setdayssetter(e.target.value);e.preventDefault()}}></input>
          
          <div>
          <label htmlFor="datePicker">Select a date:</label>
          <input
            type="date"
            id="datePicker"
            value={startdatesetter}
            onChange={(e)=>{setstartdatesetter(e.target.value);e.preventDefault()}}
          />
          <p>Selected date: {startdatesetter}</p>
        </div>
        {Object.keys(Codes).includes(sourcesetter)?<input type="submit" value="Submit"/>:<div>none</div>}
        </form>
      </div>
    </div>:
    <div>
      <div>
        {{placeName}!=="here"?
        <div style={{display:"flex"}}>
            <div style={{width:"30%"}}><Weather place={placeName} startdate={startdate} days={days}></Weather></div>
            <div style={{width:"70%"}}>
              <div>{source} to {placeName}</div>
              <div>travel on {startdate}</div>
              <div> stay for {days} days</div>
              <Map></Map>
              </div>
        </div>:<div>Search for Places</div>}
    </div>
  
    </div>
    }
  </div>
      
};

export default PlaceDetails;

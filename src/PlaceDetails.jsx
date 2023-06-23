import { useState, useContext, useRef, useEffect } from "react";
import Map from "./Map";
import Weather from "./Weather";
import { PlaceContext } from "./Contexts/PlaceContext";
import { Codes } from "./utilities/AirportCodes";
import "./App.css";

const PlaceDetails = () => {
  const [showform, setshowform] = useState(1);
  const [source, setsource] = useState("");
  const [sourcesetter, setsourcesetter] = useState("");
  const [days, setdays] = useState(3);
  const [dayssetter, setdayssetter] = useState(3);
  const [startdate, setstartdate] = useState("03-07-2023");
  const [startdatesetter, setstartdatesetter] = useState("03-07-2023");
  const { placeName } = useContext(PlaceContext);

  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const places = Object.keys(Codes);
  const [place_description, setplace_description] = useState("");
  const [placestovisit, setptv] = useState("");
  const [imagelist,setimagelist]=useState([])

  const handleToggleCard = (event) => {
    const cardHeader = event.currentTarget;
    const cardBody = cardHeader.nextElementSibling;
    cardHeader.classList.toggle('collapsed');
    cardBody.classList.toggle('show');
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    var databaseURL = 'https://placedata-a62fd-default-rtdb.firebaseio.com/placedata.json'; // Replace with your Firebase Realtime Database URL

    // Make a GET request to the Firebase Realtime Database REST API
    fetch(databaseURL)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error reading data from Firebase Realtime Database');
        }
      })
      .then(function(data) {
        setplace_description(data[placeName]["place_desc"]);
        var s = data[placeName]["want_div"];
        document.getElementById("needdiv").innerHTML = s;
        setptv(data[placeName]["places_to_visit"])
        setimagelist(data[placeName]["images"])
        
      })
      .catch(function(error) {
        console.log('Error reading data from Firebase Realtime Database:', error);
      });
      
  }, [placeName]);

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
    event.preventDefault();
  };

  const handleSelect = (value) => {
    setsourcesetter(value);
    setSuggestions([]);
  };

  return (
    <div style={{margin:"50px"}}>
      {showform === 1 ? (
        <div>
          <form
            onSubmit={(e) => {
              setsource(sourcesetter);
              setstartdate(startdatesetter);
              setdays(dayssetter);
              setshowform(0);
              e.preventDefault();
            }}
          >
            <div className="search-bar">
              <label>Enter Source Location</label>
              <input
                type="text"
                value={sourcesetter}
                onChange={handleChange}
                ref={suggestionsRef}
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
            </div>
            <div></div>
            <label>Enter No of days</label>
            <input
              type="Integer"
              value={dayssetter}
              onChange={(e) => {
                setdayssetter(e.target.value);
                e.preventDefault();
              }}
            />

            <div>
              <label htmlFor="datePicker">Select a date:</label>
              <input
                type="date"
                id="datePicker"
                value={startdatesetter}
                onChange={(e) => {
                  setstartdatesetter(e.target.value);
                  e.preventDefault();
                }}
              />
              <p>Selected date: {startdatesetter}</p>
            </div>
            {Object.keys(Codes).includes(sourcesetter) ? (
              <input type="submit" value="Submit" />
            ) : (
              <div>none</div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <div>
            {placeName !== "here" ? ( window.screen.width>700 ?
              <div style={{ display: "flex" }}>
                <div style={{ width: "25%" }}>
                  <div>
                    <h1>{placeName}</h1>
                    <div style={{fontSize:'15px',textAlign:"left"}}>{place_description}</div>
                  </div>
                  <Weather
                    place={placeName}
                    startdate={startdate}
                    days={days}
                  />
                  <div>
                    {placestovisit!==""?<div>{placestovisit.map((v,i)=>{return <div>
                      <h4>{v}</h4>
                      <img src={imagelist[String(i)]} alt="" height="100px"></img>
                      </div>})}</div>:<div></div>}
                  </div>
                </div>
                <div style={{ width: "70%", marginLeft: "5%"}}>
                  <div>
                    {source} to {placeName}
                  </div>
                  <div>travel on {startdate}</div>
                  <div>stay for {days} days</div>

                  <Map />
                  <h3 style={{textAlign:"left",color:"red"}}>
                    More About {placeName} from internet
                  </h3>
                  <div className="dropdown-content" id="needdiv" style={{ textAlign: "left" }}>
                    <div className="card"></div>
                  </div>
                </div>
              </div>:
              <div>
                <div style={{ width: "100%", marginLeft: "5%"}}>
                  <div>
                    {source} to {placeName}
                  </div>
                  <div>travel on {startdate}</div>
                  <div>stay for {days} days</div>

                  <Map />
                  <h3 style={{textAlign:"left",color:"red"}}>
                    More About {placeName} from internet
                  </h3>
                  <div className="dropdown-content" id="needdiv" style={{ textAlign: "left" }}>
                    <div className="card"></div>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <div>
                    <h1>{placeName}</h1>
                    <div style={{fontSize:'15px',textAlign:"left"}}>{place_description}</div>
                  </div>
                  <Weather
                    place={placeName}
                    startdate={startdate}
                    days={days}
                  />
                  <div>
                    {placestovisit!==""?<div>{placestovisit.map((v,i)=>{return <div>
                      <h4>{v}</h4>
                      <img src={imagelist[String(i)]} alt="" height="100px"></img>
                      </div>})}</div>:<div></div>}
                  </div>
                </div>
              </div>
            ) : (
              <div>Search for Places</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;

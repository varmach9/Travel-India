import { useState, useContext, useRef, useEffect } from "react";
import Map from "./Map";
import Weather from "./Weather";
import { PlaceContext } from "./Contexts/PlaceContext";
import { LoginContext } from "./Contexts/LoginContext";
import { Codes } from "./utilities/AirportCodes";
import "./App.css";
import axios from "axios";
import GetPlan from "./utilities/GetPlan";

const PlaceDetails = () => {
  const [showform, setshowform] = useState(1);
  const [source, setsource] = useState("Bengaluru");
  const [sourcesetter, setsourcesetter] = useState("");
  const [days, setdays] = useState(3);
  const [dayssetter, setdayssetter] = useState(3);
  const [startdate, setstartdate] = useState("2023-07-07");
  const [startdatesetter, setstartdatesetter] = useState("2023-07-07");
  const { placeName } = useContext(PlaceContext);
  const { userName } = useContext(LoginContext);
  const [userChoices,setUserChoices]=useState([])

  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const places = Object.keys(Codes).slice(0,76);
  const [place_description, setplace_description] = useState("");
  const [placestovisit, setptv] = useState("");
  const [imagelist,setimagelist]=useState([])
  const [placesData,setplacesData]=useState("ooo")
  const [loaded,setloaded]=useState(0)
// flight urls
  const base_url = "https://www.airindiaexpress.com/flight-availability?"
  const base_url_sj="https://www.spicejet.com/search?"
  const base_url_gofirst="https://book.flygofirst.com/Flight/Select?s=True&"

  const planSaver=()=>{
    console.log(document.getElementById("catch-content"))
    console.log(userName)
    const databaseURL = 'https://datausers-3257c-default-rtdb.firebaseio.com/';

      const updatedData = {};
      updatedData[`${placeName}-${days}-${startdate}`]={days:days,place:placeName,content:String(document.getElementById("catch-content").innerText)}
      axios.patch(`${databaseURL}${userName}/${"plans"}.json`, updatedData)
        .then(response => {
          console.log('Object updated successfully');
          alert('plan saved')
        })
        .catch(error => {
          console.error('Error updating object:', error);
        });
        }

  const animationsetter=()=>{
    var cardHeaders = document.querySelectorAll('.card-header');
// console.log("here1")

cardHeaders.forEach(function(header) {
  header.addEventListener('click', function() {
    var target = this.dataset.target;
    var collapseItem = document.querySelector(target);
    var isActive = collapseItem.classList.contains('show');
    // console.log("here2")
    if (isActive) {
      collapseItem.classList.remove('show');
    } else {
      collapseItem.classList.add('show');
    }
  });
});
  }
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    var databaseURL = 'https://placedata-a62fd-default-rtdb.firebaseio.com/placedata.json'; // Replace with your Firebase Realtime Database URL
    // var famousPlacesDB="https://aiweb-80256-default-rtdb.firebaseio.com";
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
        let placeNam=placeName==="banglore"?"bangalore":placeName;
        setplace_description(data[placeNam]["place_desc"]);
        var s = data[placeNam]["want_div"];
        document.getElementById("needdiv").innerHTML = s;
        animationsetter()
        setptv(data[placeNam]["places_to_visit"])
        setimagelist(data[placeNam]["images"])
      })
      .catch(function(error) {
        console.log('Error reading data from Firebase Realtime Database2:', error);
      });
      
  }, [placeName,showform]);

  useEffect(()=>{
    // console.log(placeName,"saaa")
    // console.log(placesData)
    axios
    .get("https://aiweb-80256-default-rtdb.firebaseio.com/.json")
    .then(function (response) {
      const data = response.data;
      setplacesData(data[placeName])
      // console.log(data[placeName])
      setloaded(1)
      // console.log("loading set")
  })
  .catch(function(error) {
    console.log('Error reading data from Firebase Realtime Database:', error);
  });
  },[placeName])

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
    <div style={{marginLeft:"0%",marginRight:"0%",marginTop:"20px"}}>
      {showform === 1 ? (
        <div>
          <form
            onSubmit={(e) => {
              setsource(sourcesetter);
              setstartdate(startdatesetter);
              setdays(Number(dayssetter));
              setshowform(0);
              e.preventDefault();
            }}
          >
            <div className="search-bar4">
              <label style={{fontSize:"20px"}}>Enter Source Location: </label>
              <input
                type="text"
                value={sourcesetter}
                onChange={handleChange}
                ref={suggestionsRef}
              />
              {suggestions.length > 0 && (
                <ul className="suggestions4" ref={suggestionsRef}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(suggestion)}
                      className="suggestion2"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
            <label>Enter No of days: </label>
            <input
              type="Integer"
              value={dayssetter}
              onChange={(e) => {
                setdayssetter(e.target.value);
                e.preventDefault();
              }}
            />
            </div>
            <div>
              <label htmlFor="datePicker">Select Start date: </label>
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
              <div style={{textAlign:"left", marginLeft:"10%",marginBottom:"20px"}}>Select Places To be included:</div>
              {placesData!=="ooo" && <div>{[1,2,3,4,5,6,7,8].map((k,v)=>{return <div style={{display:"flex"}}>

                <div style={{textAlign:"left",marginLeft:"10%"}}><button className="selbutton" style={{borderRadius:"50%"}} onClick={(e)=>{
                  document.getElementById(k).style.backgroundColor=(document.getElementById(k).style.backgroundColor==="green")?"":"green";
                  if(document.getElementById(k).style.backgroundColor===""){
                    userChoices.splice(userChoices.indexOf(k),1)
                  }else{
                    userChoices.push(k)
                  }
                  e.preventDefault()
                  }} id={k}>+</button> {k}. <a style={{fontWeight:"bold",color:"blue"}}> {placesData[`place${k}`]["name"]} </a> : {placesData[`place${k}`]["description"]}</div>
                </div>})}
              </div>}
              
            </div>
            {Object.keys(Codes).includes(sourcesetter) ? (
              <input type="submit" value="Submit" />
            ) : (
              <div> </div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <div>
            {placeName !== "here" ? ( window.screen.width>1000 ?
            <div>
              <div style={{color:"white",marginLeft:"12%",marginTop:"14%",position:"absolute",zIndex:1}}><h1 style={{fontSize:"50px",textAlign:"left"}}>{placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h1>
              <div style={{fontSize:'16px',textAlign:"left",width:"80%",color:"white"}}>{place_description.slice(0,584)}</div>
            </div>
              <div ><img className="jj" src={(placeName==="hyderabad"||placeName==="mumbai"||placeName==="surat"|| placeName==="visakhapatnam"|| placeName==="thane")?imagelist["2"]:imagelist["0"]} alt="" width="80%" height="450px"></img></div>
              
              
              <div style={{ display: "flex",marginLeft:"10%",marginTop:"20px"}}>
                
                <div style={{ width: "60%", marginRight: "5%",marginTop:"10px"}}>
                  
                  <div style={{display:`${window.screen.width>1400 ?"flex":""}`, border:"0.5px solid",padding:"10px"}}>
                  <div id="catch-content" style={{marginRight:"10px",marginLeft:"10px",width:"350px",textAlign:"left"}}>
                    <h3 style={{color:"green",width:"350px"}}>Your {days} - day Plan is Here...</h3>
                    <GetPlan  place={placeName} days={days} choices={userChoices} startdate={startdate}></GetPlan>
                  </div>
                  <Map width={`${window.screen.width>1400 ?"350px":"100%"}`}/>
                  </div>
                  <div style={{justifyContent:"right",display:"flex",marginRight:"10px",marginTop:"20px"}}>
                    <div onClick={planSaver}  className="saver" style={{width:"100px",marginLeft:"10px",backgroundColor:"#dfe8f7",border:"0.25px solid",padding:"5px"}}>Save this plan</div>
                  </div>
                  <h3 style={{textAlign:"left",color:"red",fontSize:"27px"}}>
                    More About {placeName} ...
                  </h3>
                  <div className="dropdown-content" id="needdiv" style={{ textAlign: "left" }}>
                    <div className="card"></div>
                  </div>
                  <div>
                    <h3 style={{textAlign:"left",color:"red",fontSize:"27px"}}>Glimpse of {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h3>
                    {placestovisit!==""?<div style={{diaplay:"flex",flexWrap:"wrap"}}>{placestovisit.map((v,i)=>{return <div style={{width:"220px",float:"left",height:"230px"}}>
                      <img src={imagelist[String(i)]} alt="" height="150px" width="200px"></img>
                      <h4>{v}</h4>
                      </div>})}</div>:<div></div>}
                  </div>
                </div>
                <div style={{ width: "300px"}}>
                <div style={{textAlign:"left",paddingLeft:"20px"}}>
                    <h3>Flights from {source} to {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h3>
                    <div style={{display:"flex"}}>
                      <div style={{marginLeft:"30px"}}><a href={`${base_url}/${Codes[source]}/${Codes[placeName]}/${startdate}`} target=" ">
                        {/* <div>Air India</div> */}
                        <img src="airindia.png" alt="" width="60px"></img>
                        </a></div>
                      <div style={{marginLeft:"50px"}}><a target=" " href={`${base_url_sj}from=${Codes[source]}&to=${Codes[placeName]}&tripType=1&departure=${startdate}&adult=1&child=0&srCitizen=0&infant=0&currency=INR&redirectTo=/`}>
                        <img src="spicejet.png" alt="" width="120px"></img></a></div>
                    </div> 
                    <div style={{display:"flex",marginTop:"10px",marginBottom:"50px"}}>
                      <div style={{marginLeft:"10px"}}><a target=" " href={`https://www.skyscanner.co.in/transport/flights/${Codes[source]}/${Codes[placeName]}`}>
                      <img src="skyscanner.png" alt="" width="120px"></img></a></div>
                      <div style={{marginLeft:"50px"}}><a target=" " href={`${base_url_gofirst}o1=${Codes[source]}&d1=${Codes[placeName]}&ADT=1&dd1=${startdate}`}>
                      <img src="gofirst.jpeg" alt="" width="60px"></img></a></div>
                      
                    </div>
                    </div>
                  <div style={{textAlign:"left",paddingLeft:"20px"}}>
                    <h3>Hotels in  {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h3>
                    <div style={{display:"flex"}}>
                      <div style={{marginLeft:"20px"}}><a href={`https://in.hotels.com/Hotel-Search?adults=1&children=&destination=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="hotels.jpeg" alt="" width="100px"></img></a></div>
                      <div style={{marginLeft:"60px"}}><a target=" " href={`https://www.airbnb.co.in/s/${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`}>
                      <img src="airbnb.png" alt="" width="60px" height="70px"></img></a></div>
                    </div> 
                    <div style={{display:"flex",marginTop:"10px",marginBottom:"50px"}}>
                      <div style={{marginLeft:"20px"}}><a target=" " href={`https://www.holidify.com/places/${placeName}/hotels-where-to-stay.html`}>
                      <img src="holidify.png" alt="" width="100px"></img></a></div>
                      <div style={{marginLeft:"50px"}}><a href={`https://www.expedia.co.in/Hotel-Search?adults=2&destination=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="expedia.jpeg" alt="" width="80px"></img></a></div>
                    </div>
                  </div>
                  <Weather/>
                  <div style={{textAlign:"left",marginTop:"100px"}}>
                    <h3>Other Activities</h3>
                    <div style={{marginBottom:"20px"}}>Car Rental</div>
                    <a href={`https://www.expedia.com/carsearch?date1=6/29/2023&date2=7/2/2023&drid1=&loc2=&locn=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="expediacars.png" alt="" width="100px"></img>
                    </a>
                    <a href={`https://www.justdial.com/${placeName.charAt(0).toUpperCase() + placeName.slice(1)}/Car-Rental`} target=" ">
                      <img src="justdial.png" alt="" width="100px" style={{marginLeft:"20px"}}></img>
                    </a>
                  </div>
                </div>
              </div>
              </div>:
              <div style={{width:"100%"}}>
                <div style={{}}>
                <div style={{color:"white",marginLeft:"5%",marginTop:`${(window.screen.width>500)?5:20}%`,position:"absolute",zIndex:1}}><h1 style={{fontSize:"20px",textAlign:"left"}}>{placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h1>
              <div style={{fontSize:`${(window.screen.width>500)?16:11}px`,textAlign:"left",width:"90%",color:"white"}}>{place_description.slice(0,584)}</div>
              </div>
              <div ><img className="jj" src={(placeName==="hyderabad"||placeName==="mumbai"||placeName==="surat"|| placeName==="visakhapatnam"|| placeName==="thane")?imagelist["2"]:imagelist["0"]} alt="" width="100%" height="300px"></img></div>
              
                  </div>
                <div style={{ width: "100%", marginLeft: "0%"}}>
                <div style={{textAlign:"left"}}>
                    <h4>Flights from {source} to {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h4>
                    <div style={{display:"flex"}}>
                      <div style={{marginLeft:"15%"}}><a href={`${base_url}/${Codes[source]}/${Codes[placeName]}/${startdate}`} target=" ">
                        
                        <img src="airindia.png" alt="" width="60px"></img>
                        </a></div>
                      <div style={{marginLeft:"20%"}}><a target=" " href={`${base_url_sj}from=${Codes[source]}&to=${Codes[placeName]}&tripType=1&departure=${startdate}&adult=1&child=0&srCitizen=0&infant=0&currency=INR&redirectTo=/`}>
                        <img src="spicejet.png" alt="" width="120px"></img></a></div>
                    </div> 
                    <div style={{display:"flex",marginTop:"10px"}}>
                      <div style={{marginLeft:"10%"}}><a target=" " href={`https://www.skyscanner.co.in/transport/flights/${Codes[source]}/${Codes[placeName]}`}>
                      <img src="skyscanner.png" alt="" width="120px"></img></a></div>
                      <div style={{marginLeft:"20%"}}><a target=" " href={`${base_url_gofirst}o1=${Codes[source]}&d1=${Codes[placeName]}&ADT=1&dd1=${startdate}`}>
                      <img src="gofirst.jpeg" alt="" width="60px"></img></a></div>
                      
                    </div>
                    </div>
                  <div style={{textAlign:"left"}}>
                    <h4>Hotels in  {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h4>
                    <div style={{display:"flex"}}>
                      <div style={{marginLeft:"10%"}}><a href={`https://in.hotels.com/Hotel-Search?adults=1&children=&destination=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="hotels.jpeg" alt="" width="100px"></img></a></div>
                      <div style={{marginLeft:"20%"}}><a target=" " href={`https://www.airbnb.co.in/s/${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`}>
                      <img src="airbnb.png" alt="" width="60px" height="70px"></img></a></div>
                    </div> 
                    <div style={{display:"flex",marginTop:"10px"}}>
                      <div style={{marginLeft:"10%"}}><a target=" " href={`https://www.holidify.com/places/${placeName}/hotels-where-to-stay.html`}>
                      <img src="holidify.png" alt="" width="100px"></img></a></div>
                      <div style={{marginLeft:"20%"}}><a href={`https://www.expedia.co.in/Hotel-Search?adults=2&destination=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="expedia.jpeg" alt="" width="80px"></img></a></div>
                    </div>
                  </div>
                  
                  <div style={{display:`${window.screen.width>1400 ?"flex":""}`, border:"0.5px solid",padding:"10px"}}>
                  <div id="catch-content" style={{marginRight:"10px",marginLeft:"10px",textAlign:"left"}}>
                    <h3 style={{color:"green",width:"350px"}}>Your {days} - day Plan is Here...</h3>
                    <GetPlan place={placeName} days={days} choices={userChoices} startdate={startdate}></GetPlan>
                  </div>
                  <Map width={`${window.screen.width>1400 ?"350px":"100%"}`}/>
                  </div>
                  <div  style={{justifyContent:"right",display:"flex",marginRight:"10px",marginTop:"20px"}}>
                    <div onClick={planSaver}  className="saver" style={{width:"100px",marginLeft:"10px",backgroundColor:"#dfe8f7",border:"0.25px solid",padding:"5px"}}>Save this plan</div>
                  </div>
                  <h3 style={{textAlign:"left",color:"red"}}>
                    More About {placeName} from internet
                  </h3>
                  <div className="dropdown-content" id="needdiv" style={{ textAlign: "left" }}>
                    <div className="card"></div>
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <Weather/>
                  <div style={{textAlign:"left",marginTop:"20px",marginLeft:"30px"}}>
                    <h3>Other Activities</h3>
                    <div style={{marginBottom:"20px"}}>Car Rental</div>
                    <a href={`https://www.expedia.com/carsearch?date1=6/29/2023&date2=7/2/2023&drid1=&loc2=&locn=${placeName.charAt(0).toUpperCase() + placeName.slice(1)}`} target=" ">
                      <img src="expediacars.png" alt="" width="100px"></img>
                    </a>
                    <a href={`https://www.justdial.com/${placeName.charAt(0).toUpperCase() + placeName.slice(1)}/Car-Rental`} target=" ">
                      <img src="justdial.png" alt="" width="100px" style={{marginLeft:"20px"}}></img>
                    </a>
                  </div>
                  <div>
                    <h3 style={{textAlign:"left",color:"red"}}>Glimpse of {placeName.charAt(0).toUpperCase() + placeName.slice(1)}</h3>
                    {placestovisit!==""?<div style={{diaplay:"flex",flexWrap:"wrap"}}>{placestovisit.map((v,i)=>{return <div style={{width:"100%",float:"left"}}>
                      <img src={imagelist[String(i)]} alt="" width="70%"></img>
                      <h4>{v}</h4>
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

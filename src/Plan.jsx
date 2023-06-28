import { useContext, useState, useEffect } from "react";
import { LoginContext } from "./Contexts/LoginContext";
import "./App.css";
import axios from "axios";
import { PageContext } from "./Contexts/PageContext";
import { Page3dataContext } from "./Contexts/Page3dataContext";
const databaseURL = 'https://datausers-3257c-default-rtdb.firebaseio.com/'

function Plan() {
  const { userName } = useContext(LoginContext);
  const [expanded, setExpanded] = useState(false);
  const [showNumber, setShowNumber] = useState(true);
  const [plans,setplans]=useState([])
  const {setpage}=useContext(PageContext)
  const {setpage3data}=useContext(Page3dataContext)
  useEffect(()=>{
    axios.get(`${databaseURL}${userName}.json`)
  .then(response => {
    try{
      setplans(response.data["plans"])
    console.log(response.data["plans"])
  }
    catch(e){console.log(e)}
  })
  setShowNumber(1)
  setExpanded(false)
  },[userName])



  const handleImageClick = () => {
    setExpanded(!expanded);
  };
  const handleTransitionEnd = () => {
    if (!expanded) {
      setShowNumber(true);
    } else {
      setShowNumber(false);
    }
  };
  const handleCityClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`scrollimg anim ${expanded ? "expanded" : ""}`}
      style={{
        borderRadius: "30px",
        backgroundImage: "url(plans.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        height:  window.screen.width>700 ? (expanded ? "89%" : `${window.screen.width * 0.03}px`):(expanded ? "100%" : `${window.screen.width *0.09}px`),
        marginTop: "20px",
        transition: "height 1s ease",
        backgroundPosition: expanded ? "" : "top"
      }}
      onClick={handleImageClick}
      onTransitionEnd={handleTransitionEnd}
    >
      {userName !== "undefined" ? (
        expanded && (
          <div style={{ paddingTop: "20%", 
          fontSize: window.screen.width>700 ? `${window.screen.width * 0.01}px`:`${window.screen.width * 0.025}px`,
          color:"darkblue",
          fontWeight:"bolder"}}>
            {userName}'s <div>travel plans:</div>
          
          {plans!==[] && 
           (Object.keys(plans)).map((plan,k)=>{
            if(plans[plan]["content"]==="07/07/2023"){return <div></div>}
            try{
            return <div id={`${k}`} onClick={()=>{
            setpage3data(plans[plan]["content"])
            setpage(3)
          }} style={{marginTop:"10px",color:"green",fontSize:"12px"}}>{plans[plan]["days"]}-day {plans[plan]["place"]} Trip <button onClick={(e)=>{
            
            axios.get(`${databaseURL}${userName}/plans.json`)
              .then(response => {
                console.log(response.data,plan)
                if (response.data && response.data.hasOwnProperty(plan)) {
                  delete response.data[plan];
                  axios.put(`${databaseURL}${userName}/plans.json`, response.data)
                    .then(response => {
                      console.log('Key-value pair deleted successfully');
                      document.getElementById(`${k}`).style.display="none"
                    })
                    .catch(error => {
                      console.error('Error updating data:', error);
                    });
                } else {
                  console.log('Either the parent key does not exist or the nested key is not present');
                }
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
            e.stopPropagation();
          }}>x</button></div>}catch(e){
            console.log("clicked way too fast")
          }
        }
          )}
          </div>)
        ) : (
        expanded && (
          <div
            style={{
              paddingTop: "20%",
              fontSize: window.screen.width>700 ? `${window.screen.width * 0.01}px`:`${window.screen.width * 0.025}px`,
              color:"black",
              fontWeight:"bolder"
            }}
          >
            Login to See Past Plans
          </div>
        )
      )}
        {!expanded && (
          <div>
          <div
            style={{
              paddingTop: "3%",
              fontSize: window.screen.width>700 ? `${window.screen.width * 0.01}px`:`${window.screen.width * 0.025}px`,
              color:"darkred",
              fontWeight:"bolder"
            }}
          >Click to View Your Past Plans</div>
          
          {showNumber && <div style={{ marginTop: "15%" ,justifyContent:"left"}} onClick={handleCityClick}>
            
            {window.screen.width>1400?<div><h3 style={{textAlign:"left",marginLeft:"30px"}}>Travel India with us</h3>
            
            <div style={{marginTop:"40px"}}>
              <a href="https://en.wikipedia.org/wiki/Mumbai" target=" "><img style={{marginRight:"20px",borderRadius:"50%",border:"0.5px solid"}} src="mumbai.png" alt="" width="100px" height="100px" ></img></a>
              <a href="https://en.wikipedia.org/wiki/Hyderabad" target=" "><img style={{marginRight:"20px"}} src="hyderabad.jpeg" alt="" width="100px"></img></a>
            </div>
            <div style={{marginTop:"40px"}}>              
              <a href="https://en.wikipedia.org/wiki/Chennai" target=" "><img style={{marginRight:"20px",borderRadius:"50%",border:"0.5px solid"}} src="chennai.png" alt="" width="100px" height="100px"></img></a>
              <a href="https://en.wikipedia.org/wiki/Delhi" target=" "><img style={{marginRight:"20px"}} src="delhi.png" alt="" width="100px"></img></a>
            </div>
            <div style={{marginTop:"40px"}}>
              <a href="https://en.wikipedia.org/wiki/Agra" target=" "><img style={{marginRight:"20px",borderRadius:"50%",border:"0.5px solid"}} src="agra.jpeg" alt="" width="100px"></img></a>
              <a href="https://en.wikipedia.org/wiki/Jaipur" target=" "><img style={{marginRight:"10px",borderRadius:"50%",border:"0.5px solid"}} src="jaipur.png" alt="" width="100px" height="100px"></img></a>
            </div></div>:<div>
            <img src="allcities.png" alt="" width={window.screen.width>700 ? `${window.screen.width*0.17}px`:"40%"}></img>
            </div>}
            
            
            </div>}
          </div>
          
        )}
    </div>
  );
}

export default Plan;

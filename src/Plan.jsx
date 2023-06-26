import { useContext, useState } from "react";
import { LoginContext } from "./Contexts/LoginContext";
import "./App.css";

function Plan() {
  const { userName } = useContext(LoginContext);
  const [expanded, setExpanded] = useState(false);
  const [showNumber, setShowNumber] = useState(true);

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
        height: expanded ? "89%" : `${window.screen.width * 0.03}px`,
        marginTop: "20px",
        transition: "height 1s ease",
        backgroundPosition: expanded ? "" : "top"
      }}
      onClick={handleImageClick}
      onTransitionEnd={handleTransitionEnd}
    >
      {userName !== "undefined" ? (
        expanded && (
          <div style={{ paddingTop: "20%", fontSize: `${window.screen.width * 0.01}px`,
          color:"darkblue",
          fontWeight:"bolder"}}>
            {userName}'s <div>travel plans:</div>
          </div>)
        ) : (
        expanded && (
          <div
            style={{
              paddingTop: "20%",
              fontSize: `${window.screen.width * 0.01}px`,
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
              fontSize: `${window.screen.width * 0.01}px`,
              color:"darkred",
              fontWeight:"bolder"
            }}
          >Click to View Your Past Plans</div>
          
          {showNumber && <div style={{ marginTop: "25%" ,justifyContent:"left"}} onClick={handleCityClick}>
            
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
            <img src="allcities.png" alt="" width={`${window.screen.width*0.17}px`}></img>
            </div>}
            
            
            </div>}
          </div>
          
        )}
    </div>
  );
}

export default Plan;

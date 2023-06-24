import { useEffect,useState } from 'react';
import './App.css';

// import context
import {LoginContext} from "./Contexts/LoginContext"
import { PlaceContext } from './Contexts/PlaceContext';
import {PageContext} from "./Contexts/PageContext"

import jwt_decode from "jwt-decode"
import SearchBar from './Searchbar';
import Home from './Pages/Home';
import PlannerPage from './Pages/PlannerPage';
import PastPlans from './Pages/PastPlans';
const databaseURL = 'https://datausers-3257c-default-rtdb.firebaseio.com/.json'


function App() {
  const [user,setUser]=useState({name:"undefined"})
  const [userName,setUserName]=useState("undefined")
  const [placeName,setPlaceName]=useState("kolkata")
  const [page,setpage]=useState(2)

  function handlecallbackresponse(res){
    var userObject=jwt_decode(res.credential)
    // console.log(userObject)
    setUser(userObject)
    setUserName(userObject.name)
    // document.getElementById("signout").hidden=0
    document.getElementById("signInDiv").hidden="true"    
  }
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"370891296555-0780mptjok2ob6gq9kjj8ele3pdtkha5.apps.googleusercontent.com",
      callback: handlecallbackresponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",type:window.screen.width>700? "":"icon",size:"large"}
    )

    google.accounts.id.prompt();
  },[])
  function signout(e){
    document.getElementById("signInDiv").hidden=0
    // document.getElementById("signout").hidden=1
    setUser({name:"undefined"})
    setUserName("undefined")
    // e.preventDefault()
  }
  return (
    <div className="App" style={{marginLeft:"4%",marginRight:"4%"}}>
      <LoginContext.Provider value={{userName,setUserName}}>
      <PlaceContext.Provider value={{placeName,setPlaceName}}>
      <PageContext.Provider value={{page,setpage}}> <div>
      <div style={{display:"flex",marginLeft:`${window.screen.width>1000 ?"10%":"0"}`,marginTop:"10px",height:"45px",marginBottom:`${window.screen.width>1000 ?"20px":"10px"}`}}>
      <img src="travelindialogo.png" alt="" width={`${window.screen.width>1000 ?"140px":"80px"}`} height={`${window.screen.width>1000 ?"50px":"40px"}`} style={{borderRadius:"20px",marginRight:"20px"}}></img>
      <div id="signInDiv"></div>
      {(user.name==="undefined" || window.screen.width<=800) &&  <div style={{justifyContent:"right",display:"flex",width:"60%",paddingTop:"10px"}}><SearchBar></SearchBar></div>}
      
      {(user.name!=="undefined") && 
        <div style={{display:"flex",width:`${window.screen.width>1000 ?"70%":"20%"}`, justifyContent:"right",marginTop:`${window.screen.width>1000 ?"10px":"0px"}`}}>
        {window.screen.width>800 &&  <SearchBar></SearchBar>}
        <div style={{marginTop:"5px",marginRight:`${window.screen.width>1000?30:0}px`,fontSize:`16px`}}> {window.screen.width>1000 &&`Welcome ${user.name}`}  </div>
        <div ><img className="dropdown-buttona" src={user.picture} alt="T-I" style={{width:"40px",borderRadius:"50%"}}></img>
        <div id="myDropdowna" class="dropdown-contenta showa" onClick={signout}>Log out
    </div>
        </div></div>}
        </div>
        <hr style={{width:`${window.screen.width>1000 ?"85%":"100%"}`}}></hr>

      </div> 
      <div>
          {page===1?<Home/>:page===2?<PlannerPage/>:<PastPlans/>}
        
      </div>


     <div>footer</div>
     </PageContext.Provider>
     </PlaceContext.Provider>
     </LoginContext.Provider>
    </div>
  );
}

export default App;

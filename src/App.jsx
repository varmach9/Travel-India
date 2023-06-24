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
      {theme:"outline",size:"medium"}
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
    <div className="App" style={{margin:"4%"}}>
      <LoginContext.Provider value={{userName,setUserName}}>
      <PlaceContext.Provider value={{placeName,setPlaceName}}>
      <PageContext.Provider value={{page,setpage}}> <div>
      <div style={{display:"flex",marginLeft:`${window.screen.width>1000 ?"10%":"0"}`,marginTop:"10px",height:"70px"}}>
      <img src="travelindialogo.png" alt="" width={`${window.screen.width>1000 ?"140px":"80px"}`} height={`${window.screen.width>1000 ?"50px":"40px"}`} style={{borderRadius:"20px",marginRight:"20px"}}></img>
      <div id="signInDiv"></div>
      
      {(user.name!=="undefined") && 
        <div style={{display:"flex",width:"80%", justifyContent:"right"}}>
        {window.screen.width>800 &&  <SearchBar></SearchBar>}
        <div style={{height:"25px",marginTop:"10px",marginRight:`${window.screen.width>1000?30:10}px`,fontSize:`16px`}}> Welcome {user.name} </div>
        <div><div><img src={user.picture} alt="T-I" style={{width:"50px",borderRadius:"50%"}}></img></div>
        <button  style={{height:"20px",fontSize:"10px"}}onClick={signout} id="signout">Log out</button>
        </div></div>}
        </div>
        {window.screen.width<=800 &&  <SearchBar></SearchBar>}
        <hr></hr>

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

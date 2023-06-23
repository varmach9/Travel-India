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
  const [placeName,setPlaceName]=useState("hyderabad")
  const [page,setpage]=useState(1)

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
      {theme:"outline",size:"large"}
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
    <div className="App">
      <LoginContext.Provider value={{userName,setUserName}}>
      <PlaceContext.Provider value={{placeName,setPlaceName}}>
      <PageContext.Provider value={{page,setpage}}>
      <div>
      <div id="signInDiv"></div>

      {(user.name!=="undefined") && 
      <div >
        <img src={user.picture}></img>
        <div>{user.name}</div>
        <button onClick={signout} id="signout">Sign out</button>
        </div>}
        <SearchBar></SearchBar>
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

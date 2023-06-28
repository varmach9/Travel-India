import { useEffect,useState } from 'react';
import './App.css';

// import context
import {LoginContext} from "./Contexts/LoginContext"
import { PlaceContext } from './Contexts/PlaceContext';
import {PageContext} from "./Contexts/PageContext"
import { Page3dataContext } from './Contexts/Page3dataContext';
import axios from "axios";
import jwt_decode from "jwt-decode"
import SearchBar from './Searchbar';
import Home from './Pages/Home';
import PlannerPage from './Pages/PlannerPage';
import PastPlans from './Pages/PastPlans';
const databaseURL = 'https://datausers-3257c-default-rtdb.firebaseio.com/'


function App() {
  const [user,setUser]=useState({name:"undefined"})
  const [userName,setUserName]=useState("undefined")
  const [placeName,setPlaceName]=useState("kolkata")
  const [page,setpage]=useState(1)
  const [page3data,setpage3data]=useState(1)

  function handlecallbackresponse(res){
    var userObject=jwt_decode(res.credential)
    // console.log(userObject)
    setUser(userObject)
    setUserName(userObject.name)
    const key=userObject.name;
    const value={
      gmail:userObject.email,
      plans:[{place:"hyderabad",days:3,content:"07/07/2023"}]
    }

axios.get(`${databaseURL}${key}.json`)
  .then(response => {
    if (response.data === null) {
      // Key does not exist, send the PUT request to add data
      axios.put(`${databaseURL}${key}.json`, JSON.stringify(value))
        .then(response => {
          console.log('Data added successfully');
        })
        .catch(error => {
          console.error('Error adding data:', error);
        });
    } else {
      console.log('Key already exists');
    }
  })
  .catch(error => {
    console.error('Error checking key:', error);
  });


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
    setUser({name:"undefined"})
    setUserName("undefined")
  }
  return (
    <div className="App" style={{marginLeft:"4%",marginRight:"4%"}}>
      <LoginContext.Provider value={{userName,setUserName}}>
      <PlaceContext.Provider value={{placeName,setPlaceName}}>
      <PageContext.Provider value={{page,setpage}}> 
      <Page3dataContext.Provider value={{page3data,setpage3data}}> <div>
  <div class="home-button" onClick={()=>{
    setpage(1)
  }}><img src="home.png" alt="" width="50px"></img></div>
      <div style={{display:"flex",marginLeft:`${window.screen.width>1000 ?"10%":"0"}`,marginTop:"10px",height:"45px",marginBottom:`${window.screen.width>1000 ?"20px":"10px"}`}}>
      <img src="travelindialogo.png" alt="" width={`${window.screen.width>1000 ?"140px":"50px"}`} height={`${window.screen.width>1000 ?"50px":"40px"}`} style={{borderRadius:"20px",marginRight:"20px"}}></img>
      <div id="signInDiv"></div>
      {(user.name==="undefined" || window.screen.width<=800) &&  <div style={{justifyContent:"right",display:"flex",width:`${window.screen.width>1000 ?"50%":"80%"}`,paddingTop:`${window.screen.width>1000 ?"10px":"5px"}`}}><SearchBar></SearchBar></div>}
      
      {(user.name!=="undefined") && 
        <div style={{display:"flex",width:`${window.screen.width>800 ?"70%":"20%"}`, justifyContent:"right",marginTop:`${window.screen.width>1000 ?"10px":"0px"}`}}>
        {window.screen.width>800  && <SearchBar></SearchBar>}
        <div style={{marginTop:"5px",marginRight:`${window.screen.width>1000?30:0}px`,fontSize:`16px`}}> {window.screen.width>1200 &&`Welcome ${user.name}`}  </div>
        <div ><img className="dropdown-buttona" src={user.picture} alt="T-I" style={{width:"40px",borderRadius:"50%"}}></img>
        <div id="myDropdowna" class="dropdown-contenta showa" onClick={signout}>Log out
    </div>
        </div></div>}
        </div>
        <hr style={{width:`${window.screen.width>1000 ?"85%":"100%"}`}}></hr>

      </div>
          {page===1?<Home/>:page===2?<PlannerPage/>:<PastPlans/>}


     <div>footer</div>
     </Page3dataContext.Provider>
     </PageContext.Provider>
     </PlaceContext.Provider>
     </LoginContext.Provider>
    </div>
  );
}

export default App;

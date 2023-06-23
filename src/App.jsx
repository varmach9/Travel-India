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
      <div id="signInDiv"></div>

      {(user.name!=="undefined") && 
      <div>
        <img src={user.picture}></img>
        <div>{user.name}</div>
        <button onClick={signout} id="signout">Sign out</button>
        </div>}
        <SearchBar></SearchBar>
        <hr></hr>
      
        
          {page===1?<Home/>:page===2?<PlannerPage/>:<PastPlans/>}
        
              {/* <Route path="/" element={<Home />} />
              <Route path="/plannerpage" element={<PlannerPage />} />
              <Route path="/pastplans" element={<PastPlans/>} /> */}


      {/* <button onClick={()=>{
          console.log("start")
          axios.get(databaseURL)
            .then(function(response) {
              console.log("get details from db respnse")
              const data = response.data;
              console.log('Data retrieved:', data);
              if(user.name in data){console.log("user already in databse")}
              else{
                let k=user.name
                const data = {};
                data[user.name]=["hyderabad"];
                console.log("dta to be written:",data)
                axios.patch(databaseURL, data)
                  .then(function(response) {
                    console.log('Data written successfully!');
                  })
                  .catch(function(error) {
                    console.error('Error writing data: ', error);
                  });
              }
            })
            .catch(function(error) {
              console.log(" error while getting details from db respnse")
              console.error('Error reading data:', error);
            });
            
            console.log("starting to put data")
            
          console.log("end") 
      /* }}>Test DB</button> */}


     <div>footer</div>
     </PageContext.Provider>
     </PlaceContext.Provider>
     </LoginContext.Provider>
    </div>
  );
}

export default App;

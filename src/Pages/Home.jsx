import React from 'react'
import Plan from '../Plan'
import PlaceDetails from '../PlaceDetails'
import SearchBar from '../Searchbar'

const Home = () => {
  console.log("home")
  return (
    <div>
    <div style={{display:"flex"}}>
      <div style={{width:'20%',paddingLeft:"10px"}}><Plan/></div>
      <div style={{width:"75%"}}>
        <h4>Custom Home TEMPLATE </h4>
        <SearchBar></SearchBar>
      </div>
      </div> 
    </div>
  )
}

export default Home
import React from 'react'
import PlaceDetails from '../PlaceDetails'
import { PlaceContext } from '../Contexts/PlaceContext'
import { useContext } from 'react'
const PlannerPage = () => {
    const placeName=useContext(PlaceContext)
  return (
    <div>
        {{placeName}!=="here"?
        <div style={{display:"flex"}}>
            
            <div style={{width:"100%"}}><PlaceDetails></PlaceDetails></div>
        </div>:<div>Search for Places</div>}
    </div>
  )
}

export default PlannerPage
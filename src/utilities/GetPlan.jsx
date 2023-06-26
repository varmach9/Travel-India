import {  useEffect ,useState} from "react";

import axios from "axios";


const GetPlan = (props) => {
  const placeName=props.place;
  const arr=[4,2,5]
  const [placesData,setplacesData]=useState("ooo")
  useEffect(()=>{
    axios
    .get("https://aiweb-80256-default-rtdb.firebaseio.com/.json")
    .then(function (response) {
      const data = response.data;
      setplacesData(data[placeName])
      console.log(data[placeName],"hwee")
  })
  .catch(function(error) {
    console.log('Error reading data from Firebase Realtime Database:', error);
  });

  },[placeName])

  if(props.days===1){
    return Plan1dayTrip(arr)}
  if(props.days===2){
  return Plan2dayTrip(arr)}
  if(props.days===3){
    return Plan3dayTrip(arr,placesData)}
  if(props.days===4){
    return Plan4dayTrip(arr)}
}

const Plan4dayTrip=(arr)=>{
  let l=arr.length
  let i=1;
  while(l<8){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }
  
    return (<div>
      <h4>{arr}</h4>
    </div>)
}
const Plan3dayTrip=(arr,placedata)=>{
  let l=arr.length
  let i=1;
  while(l<6){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }

    TSP(placedata,arr)
    return (<div>
      <h4>{arr}</h4>
    </div>)
}
const Plan2dayTrip=(arr)=>{
  let l=arr.length
  let i=1;
  while(l<6){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }
  
    return (<div>
      <h4>{arr}</h4>
    </div>)
}
const Plan1dayTrip=(arr)=>{
  let l=arr.length
  let i=1;
  while(l<4){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }
  
    return (<div>
      <h4>{arr}</h4>
    </div>)
}


const TSP=(placedata,arr)=>{
  if(placedata==="ooo"){return}

  function calculateDistance(pointA, pointB) {
    // Calculate the Euclidean distance between two points
    const deltaX = pointB.x - pointA.x;
    const deltaY = pointB.y - pointA.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  
  function permute(permutation) {
    // Generate all possible permutations of a given array
    const length = permutation.length;
    if (length === 1) return [permutation];
  
    const result = [];
  
    for (let i = 0; i < length; i++) {
      const current = permutation[i];
      const remaining = [...permutation.slice(0, i), ...permutation.slice(i + 1)];
      const remainingPermutations = permute(remaining);
  
      for (let j = 0; j < remainingPermutations.length; j++) {
        result.push([current, ...remainingPermutations[j]]);
      }
    }
  
    return result;
  }
  
  function findShortestRoute(places) {
    const locations = Object.values(places);
    const permutations = permute(locations);
    let shortestRoute;
    let shortestDistance = Infinity;
  
    for (let i = 0; i < permutations.length; i++) {
      const route = permutations[i];
      let distance = 0;
  
      for (let j = 0; j < route.length - 1; j++) {
        const currentPlace = route[j];
        const nextPlace = route[j + 1];
        distance += calculateDistance(currentPlace, nextPlace);
      }
  
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestRoute = route;
      }
    }
  
    return shortestRoute;
  }
  // Example usage
  const places = {};
  for(let i=0;i<arr.length;i++){
    let index=`place${arr[i]}`
    places[placedata[index]["name"]]={x: placedata[index]["coordinates"].latitude, y: placedata[index]["coordinates"].longitude }
  }
  const shortestRoute = findShortestRoute(places);
  console.log(shortestRoute);

  for (let i=0;i<shortestRoute.length;i++){
    for (let j=1;j<=8;j++){
      if (shortestRoute[i]===places[placedata[`place${j}`]["name"]]){console.log(placedata[`place${j}`]["name"])
      if(i%3===0){console.log("lunch",placedata[`place${j}`]["restaurant"]["name"],"near",placedata[`place${j}`]["name"])}
      if(i%3===2){console.log("dinner",placedata[`place${j}`]["restaurant"]["name"],"near",placedata[`place${j}`]["name"])}
    }
    }
  }

  
}
export default GetPlan
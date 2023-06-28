import {  useEffect ,useState} from "react";

import axios from "axios";


const GetPlan = (props) => {
  const placeName=props.place;
  const arr=props.choices;
  const [placesData,setplacesData]=useState("ooo")
  useEffect(()=>{
    axios
    .get("https://aiweb-80256-default-rtdb.firebaseio.com/.json")
    .then(function (response) {
      const data = response.data;
      setplacesData(data[placeName])
      // console.log(data[placeName],"hwee")
  })
  .catch(function(error) {
    console.log('Error reading data from Firebase Realtime Database:', error);
  });

  },[placeName])
  // console.log("eneterd days",props.startdate,props.days)
  if(props.days===1){
    return Plan1dayTrip(arr,placesData,props.startdate)}
  if(props.days===2){
  return Plan2dayTrip(arr,placesData,props.startdate)}
  if(props.days===3){
    return Plan3dayTrip(arr,placesData,props.startdate)}
  if(props.days===4){
    return Plan4dayTrip(arr,placesData,props.startdate)}
}

const Plan4dayTrip=(arr,placedata,startdate)=>{
  let l=arr.length
  let i=1;
  while(l<8){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }

  function dateAddDays( datstr,  ndays){
    var dattmp = datstr.split('-').join('/');
    var nwdate =  new Date(dattmp);
    nwdate.setDate(nwdate.getDate() + (ndays || 1));
    return [ zeroPad(nwdate.getDate(), 10)
            ,zeroPad(nwdate.getMonth()+1, 10)
            ,nwdate.getFullYear() ].join('/');
  }
  function zeroPad(nr, base){
    var len = (String(base).length - String(nr).length) + 1;
    return len > 0? new Array(len).join('0') + nr : nr;
  }  
    let plan=TSP(placedata,arr)
    return (<div>
<h4 className="day-toggle" onClick={()=>{document.getElementById("1").classList.toggle("open")}}>Day-1 : {startdate.split("-").reverse().join("/")}</h4>
<ul className="plan-list" id="1">
  <li>Morning : visit {plan[0]}</li>
  <li>Lunch at {plan[1]} near {plan[0]}</li>
  <li>Evening : visit {plan[2]}</li>
  <li>Dinner at {plan[3]} near {plan[2]}</li>
</ul>

<h4 className="day-toggle" onClick={()=>{document.getElementById("2").classList.toggle("open")}}>Day-2 :  {dateAddDays(startdate,1)}</h4>
<ul className="plan-list" id="2">
  <li>Morning : visit {plan[4]}</li>
  <li>Lunch at {plan[5]} near {plan[4]}</li>
  <li>Evening : visit {plan[6]}</li>
  <li>Dinner at {plan[7]} near {plan[6]}</li>
</ul>

<h4 className="day-toggle"onClick={()=>{document.getElementById("3").classList.toggle("open")}}>Day-3 : {dateAddDays(startdate,2)}</h4>
<ul className="plan-list" id="3">
  <li>Morning : visit {plan[8]}</li>
  <li>Lunch at {plan[9]} near {plan[8]}</li>
  <li>Evening : visit {plan[10]}</li>
  <li>Dinner at {plan[11]} near {plan[10]}</li>
</ul>
<h4 className="day-toggle"onClick={()=>{document.getElementById("4").classList.toggle("open")}}>Day-4 : {dateAddDays(startdate,3)}</h4>
<ul className="plan-list" id="4">
  <li>Morning : visit {plan[12]}</li>
  <li>Lunch at {plan[13]} near {plan[12]}</li>
  <li>Evening : visit {plan[14]}</li>
  <li>Dinner at {plan[15]} near {plan[14]}</li>
</ul>
    </div>)
}



const Plan3dayTrip=(arr,placedata,startdate)=>{
  let l=arr.length
  let i=1;
  while(l<8){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }


  function dateAddDays( datstr,  ndays){
    var dattmp = datstr.split('-').join('/');
    var nwdate =  new Date(dattmp);
    nwdate.setDate(nwdate.getDate() + (ndays || 1));
    return [ zeroPad(nwdate.getDate(), 10)
            ,zeroPad(nwdate.getMonth()+1, 10)
            ,nwdate.getFullYear() ].join('/');
  }
  function zeroPad(nr, base){
    var len = (String(base).length - String(nr).length) + 1;
    return len > 0? new Array(len).join('0') + nr : nr;
  }  



    let plan=TSP(placedata,arr)
    return (<div>
      <h4 className="day-toggle" onClick={()=>{document.getElementById("1").classList.toggle("open")}}>Day-1 : {startdate.split("-").reverse().join("/")}</h4>
<ul className="plan-list" id="1">
  <li>Morning : visit {plan[0]}</li>
  <li>Lunch at {plan[1]} near {plan[0]} or {plan[3]} near {plan[2]}</li>
  <li>Afternoon : visit {plan[2]}</li>
  <li>Evening : visit {plan[4]}</li>
  <li>Dinner at {plan[5]} near {plan[4]}</li>
</ul>

<h4 className="day-toggle" onClick={()=>{document.getElementById("2").classList.toggle("open")}}>Day-2 :  {dateAddDays(startdate,1)}</h4>
<ul className="plan-list" id="2">
  <li>Morning : visit {plan[6]}</li>
  <li>Lunch at {plan[7]} near {plan[6]} or {plan[9]} near {plan[8]}</li>
  <li>Afternoon : visit {plan[8]}</li>
  <li>Evening : visit {plan[10]}</li>
  <li>Dinner at {plan[11]} near {plan[10]}</li>
</ul>

<h4 className="day-toggle"onClick={()=>{document.getElementById("3").classList.toggle("open")}}>Day-3 : {dateAddDays(startdate,2)}</h4>
<ul className="plan-list" id="3">
  <li>Morning : visit {plan[12]}</li>
  <li>Lunch at {plan[13]} near {plan[12]} or {plan[15]} near {plan[14]}</li>
  <li>Afternoon : visit {plan[14]}</li>
  <li>Travel Back in the evening</li>
</ul>
    </div>)
}
const Plan2dayTrip=(arr,placedata,startdate)=>{
  let l=arr.length
  let i=1;
  while(l<6){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }

  function dateAddDays( datstr,  ndays){
    var dattmp = datstr.split('-').join('/');
    var nwdate =  new Date(dattmp);
    nwdate.setDate(nwdate.getDate() + (ndays || 1));
    return [ zeroPad(nwdate.getDate(), 10)
            ,zeroPad(nwdate.getMonth()+1, 10)
            ,nwdate.getFullYear() ].join('/');
  }
  function zeroPad(nr, base){
    var len = (String(base).length - String(nr).length) + 1;
    return len > 0? new Array(len).join('0') + nr : nr;
  }  
    let plan=TSP(placedata,arr)
    return (<div>
      <h4 className="day-toggle" onClick={()=>{document.getElementById("1").classList.toggle("open")}}>Day-1 : {startdate.split("-").reverse().join("/")}</h4>
<ul className="plan-list" id="1">
  <li>Morning : visit {plan[0]}</li>
  <li>Lunch at {plan[1]} near {plan[0]} or {plan[3]} near {plan[2]}</li>
  <li>Afternoon : visit {plan[2]}</li>
  <li>Evening : visit {plan[4]}</li>
  <li>Dinner at {plan[5]} near {plan[4]}</li>
</ul>

<h4 className="day-toggle" onClick={()=>{document.getElementById("2").classList.toggle("open")}}>Day-2 :  {dateAddDays(startdate,1)}</h4>
<ul className="plan-list" id="2">
  <li>Morning : visit {plan[6]}</li>
  <li>Lunch at {plan[7]} near {plan[6]} or {plan[9]} near {plan[8]}</li>
  <li>Afternoon : visit {plan[8]}</li>
  <li>Evening : visit {plan[10]}</li>
  <li>Dinner at {plan[11]} near {plan[10]}</li>
</ul>
    </div>)
}
const Plan1dayTrip=(arr,placedata,startdate)=>{
  let l=arr.length
  let i=1;
  while(l<4){
    if (!arr.includes(i)){arr.push(i);l++}
    i++;
  }
    let plan=TSP(placedata,arr)
    return (<div>
      <h4 className="day-toggle" onClick={()=>{document.getElementById("1").classList.toggle("open")}}>Day-1 : {startdate.split("-").reverse().join("/")}</h4>
        <ul className="plan-list" id="1">
          <li>Morning 9 AM : visit {plan[0]}</li>
          <li>Morning 11 AM: visit {plan[2]}</li>
          <li>Lunch at {plan[3]} near {plan[2]} or {plan[5]} near {plan[4]}</li>
          <li>Afternoon : visit {plan[4]}</li>
          <li>Evening : visit {plan[6]}</li>
          <li>Dinner at {plan[7]} near {plan[6]}</li>
        </ul>
    </div>)
}


const TSP=(placedata,arr)=>{
  if(placedata==="ooo"){return ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}

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
  const places = {};
  for(let i=0;i<arr.length;i++){
    let index=`place${arr[i]}`
    places[placedata[index]["name"]]={x: placedata[index]["coordinates"].latitude, y: placedata[index]["coordinates"].longitude }
  }
  const shortestRoute = findShortestRoute(places);
  // console.log(shortestRoute);
  let answer=[];
  for (let i=0;i<shortestRoute.length;i++){
    for (let j=1;j<=8;j++){
      if (shortestRoute[i]===places[placedata[`place${j}`]["name"]]){answer.push(placedata[`place${j}`]["name"])
      answer.push(placedata[`place${j}`]["restaurant"]["name"])
    }
    }
  }

  return answer
}
export default GetPlan
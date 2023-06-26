import React from 'react'
import { useContext, useEffect, useRef } from "react";
import { PlaceContext } from "./Contexts/PlaceContext";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const Map = (props) => {
    const { placeName } = useContext(PlaceContext);
    // console.log("pppp", placeName);
  
    const markerCoordinates = useRef([]);
    const markernames = useRef([]);
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markers = useRef([]);
  
    useEffect(() => {
      // console.log("start");
      axios
        .get("https://aiweb-80256-default-rtdb.firebaseio.com/.json")
        .then(function (response) {
          const data = response.data;
          let coordinates = {};
          while(markerCoordinates.current.length!==0){markerCoordinates.current.pop()}
          while(markernames.current.length!==0){markernames.current.pop()}
          if (placeName === "here") {
            coordinates = data["coord"]["agra"];
          } else {
            coordinates = data["coord"][placeName];
            // console.log(data[placeName], "a");
            for (let place in data[placeName]) {
              markerCoordinates.current.push(
                data[placeName][place]["coordinates"]
              );
              markernames.current.push(data[placeName][place]["name"])
            }
          }
          // console.log(markerCoordinates.current);
  
          if (mapInstance.current) {
            // Remove existing markers from the map
            markers.current.forEach(marker => marker.remove());
            markers.current = [];
            mapInstance.current.remove();
          }
  
          const map = L.map(mapRef.current).setView(
            [coordinates.latitude, coordinates.longitude],
            11
          );
  
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Travel-India",
            maxZoom: 18,
          }).addTo(map);
  
          // Add markers
          const customIcon = L.icon({
            iconUrl: "marker.png",
            iconSize: [25, 20],
          });
  
          markerCoordinates.current.forEach((marker,i) => {
            const markerInstance = L.marker(
              [marker.latitude, marker.longitude],
              { icon: customIcon }
            ).addTo(map)
            .on("click", () => {
              L.popup().setContent(markernames.current[i]).setLatLng(markerInstance.getLatLng()).openOn(map);
            });
            markers.current.push(markerInstance);
          });
  
          mapInstance.current = map;
        })
        .catch(function (error) {
          console.error("Error retrieving data:", error);
        });
    }, [placeName]);
  
    return (
      <div>
        {placeName === "here" ? (
          <div>Search for a place</div>
        ) : (
          <div style={{ marginTop: "10px" }}>  
            <div
              id="map"
              style={{ height: "450px", width: props.width }}
              ref={mapRef}
            ></div>
          </div>
        )}
      </div>
    );
  };
  
  export default Map
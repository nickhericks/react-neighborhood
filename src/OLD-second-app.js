import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"





const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -25.957060, lng: 32.574549 }}
  >
    {props.isMarkerShown && <Marker
      position={{ lat: -25.959437, lng: 32.595876 }}
      visible={true}
      clickable={true}
      onMouseOver={function() {
        // console.log('mouseOver!');
        this.setAnimation(window.google.maps.Animation.BOUNCE)
      }}
      onMouseOut={function() {
        // console.log('mouseOut!');
        this.setAnimation(null)
      }}
    />}
    {props.isMarkerShown && <Marker
      position={{ lat: -25.948188, lng: 32.616826 }}
      visible={true}
      clickable={true}
      onMouseOver={function() {
        // console.log('mouseOver!');
        this.setAnimation(window.google.maps.Animation.BOUNCE)
      }}
      onMouseOut={function() {
        // console.log('mouseOut!');
        this.setAnimation(null)
      }}
    />}
  </GoogleMap>
))





class App extends Component {

state = {
  locations: [
      {
      "id": "botanica",
      "name": "Botanica",
      "type": "Restaurant",
      "lat": -25.959437,
      "lng": 32.595876,
      "address": "148, Rua Kibiriti Diwane, Maputo"
   },
    {
      "id": "marna",
      "name": "Marna Brasa",
      "type": "Restaurant",
      "lat": -25.948188,
      "lng": 32.616826,
      "address": "Avenida da Marginal, Maputo"
   },
    {
      "id": "dhow",
      "name": "Dhow Maputo",
      "type": "Restaurant",
      "lat": -25.981845,
      "lng": 32.587764,
      "address": "4, Rua da Marracuene, Maputo"
   },
    {
      "id": "treehouse",
      "name": "Tree House",
      "type": "Restaurant",
      "lat": -25.976285,
      "lng": 32.59124,
      "address": "Avenida Francisco Orlando Magumbwe, Maputo"
   },
    {
      "id": "txhapo",
      "name": "Txhapo Txhapo",
      "type": "Restaurant",
      "lat": -25.973433,
      "lng": 32.592392,
      "address": "Avenida Eduardo Mondlane, Maputo"
   }
  ]
}

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maputo Restaurants</h1>
          <span></span>
        </header>

        <div className="container">
          <div className="side-bar">
            <div>
              <input id="zoom-to-area-text" type="text" placeholder="Filter restaurants by name"/>
            </div>
            <div>
              <input id="show-listings" type="button" value="Show Listings"/>
              <input id="hide-listings" type="button" value="Hide Listings"/>
            </div>
          </div>

          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB8u8SHJ767vZjqYAHapTSCLFDDwXVCt-E"
            loadingElement={<div style={{ height: `100vh` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
// import PalmLogo from './palm-logo.png';
import Logo from './logo.svg';
import './App.css';
import Restaurants from './restaurants.json';
import FacebookProvider, { Like } from 'react-facebook-sdk';
import Example from './LikeButton.js';


function loadGoogleMap(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Apologies friend, the map is not available at this time.");
  };
  ref.parentNode.insertBefore(script, ref);
}




class App extends Component {
  state = {
    alllocations: Restaurants,
    map: "",
    infowindow: "",
    prevmarker: ""
  }

  // retain object instance when used in the function
  initMap = this.initMap.bind(this);
  openInfoWindow = this.openInfoWindow.bind(this);
  closeInfoWindow = this.closeInfoWindow.bind(this);


  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadGoogleMap(
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places&key=AIzaSyB8u8SHJ767vZjqYAHapTSCLFDDwXVCt-E&callback=initMap"
    );
  }

  /**
   * Initialise the map once the google map script is loaded
   */
  initMap() {
    var self = this;

    var mapview = document.getElementById("map");
    // mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: -25.957060, lng: 32.574549 },
      zoom: 14,
      mapTypeControl: false
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    var alllocations = [];
    this.state.alllocations.forEach(function(location) {
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.lat,
          location.lng
        ),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      location.marker = marker;
      location.display = true;
      alllocations.push(location);
    });
    this.setState({
      alllocations: alllocations
    });
  }

  /**
   * Open the infowindow for the marker
   * @param {object} location marker
   */
  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    });
    this.state.infowindow.setContent("Loading Data...");
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    console.log(marker);

    this.getMarkerInfo(marker);


  }



  /**
   * Retrive the location data from the foursquare api
   */
  getMarkerInfo(marker) {
    var self = this;

    // Add the api keys for foursquare
    var clientId = "3PB1F0SFR1YGO3QOX3M4IP5V252NZ1MNDCSQBE3QRAOSM0DO";
    var clientSecret = "QALQH0RVFJJ4ASGF1SOMNKUJNEFPM1MW01TS2DBIWVTBOG2C";

    // Build the api endpoint
    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.state.infowindow.setContent("Sorry data can't be loaded");
          return;
        }

        // Get the text in the response
        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var fbfb = `<Example />`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;
          var checkinsCount =
            "<b>Number of CheckIn: </b>" +
            location_data.stats.checkinsCount +
            "<br>";
          var readMore =
            '<a href="https://foursquare.com/v/' +
            location_data.id +
            '" target="_blank">Read More on <b>Foursquare Website</b></a>';
          self.state.infowindow.setContent(
            place + street + contact + checkinsCount + readMore + fbfb + `<Example />` + `this now`
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Sorry data can't be loaded");
      });
  }

  /**
   * Close the info window previously opened
   *
   * @memberof App
   */
  closeInfoWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({
      prevmarker: ""
    });
    this.state.infowindow.close();
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maputo Restaurants</h1>
          <span></span>
        </header>

        <div className="container">
          <RestaurantList
            key="8000"
            alllocations={this.state.alllocations}
            openInfoWindow={this.openInfoWindow}
            closeInfoWindow={this.closeInfoWindow}
          />
          <div id="map" />
        </div>
      </div>
    );
  }
}

export default App;

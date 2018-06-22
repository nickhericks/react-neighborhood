import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
import Restaurants from './restaurants.json';
import MenuImage from './menu.png';
import './App.css';

// Load Google map asynchronously
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

// App React Component
class App extends Component {
  state = {
    allLocations: Restaurants,
    map: "",
    infowindow: "",
    previewMarker: ""
  }

  // Retain object instance when used in function
  initMap = this.initMap.bind(this);
  openInfoWindow = this.openInfoWindow.bind(this);
  closeInfoWindow = this.closeInfoWindow.bind(this);

  // Wait for App Component to load, then begin loading Google Map
  componentDidMount() {
    window.initMap = this.initMap;
    loadGoogleMap(
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,places&key=AIzaSyB8u8SHJ767vZjqYAHapTSCLFDDwXVCt-E&callback=initMap"
    );
  }

   //Initialize Google Map after script is loaded
  initMap() {
    var self = this;

    var mapContain = document.getElementById("map");
    var map = new window.google.maps.Map(mapContain, {
      center: { lat: -25.959551, lng: 32.588191 },
      zoom: 14,
      mapTypeControl: false
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    // Close infowindow if close button is clicked
    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    // Center map on selected marker
    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    // Close infowindow if map is clicked
    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    var allLocations = [];

    // Create map markers
    this.state.allLocations.forEach(function(location) {
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.lat,
          location.lng
        ),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener("click", function() {
        self.openInfoWindow(location);
      });

      location.marker = marker;
      location.display = true;
      allLocations.push(location);
    });
    this.setState({
      allLocations: allLocations
    });
  }

  // Open info window
  openInfoWindow(data) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, data.marker);
    data.marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({ previewMarker: data.marker });
    this.state.infowindow.setContent("Loading Data...");
    this.state.map.setCenter(data.marker.getPosition());
    this.state.map.panBy(0, -200);
    // this.getMarkerInfo(data.marker);
    this.state.infowindow.setContent(`
      <div>
        <h3>${data.name}</h3>
        <h4>${data.type}</h4>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
      </div>
      `);
  }

  // Close  info window
  closeInfoWindow() {
    if (this.state.previewMarker) {
      this.state.previewMarker.setAnimation(null);
    }
    this.setState({
      previewMarker: ""
    });
    this.state.infowindow.close();
  }

  // Toggle side bar men
  toggleMenu() {
    var menuBar = document.querySelector('.side-menu');
    var mapWidth = document.querySelector('#map');
    if(menuBar.style.left !== "-100%") {
      menuBar.style.left = "-100%";
      mapWidth.style.left = "0";
    } else {
      menuBar.style.left = "0";
      mapWidth.style.left = "268px";
    }
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img
            src={MenuImage}
            className="App-logo"
            alt="logo"
            aria-label="Navigation menu"
            tabIndex="0"
            role="button"
            onClick={(click) => this.toggleMenu()}
          />
          <h1
            className="App-title"
            >Maputo Restaurants
          </h1>
          <span></span>
        </header>

        <div className="container">
          <RestaurantList
            key="8000"
            allLocations={this.state.allLocations}
            openInfoWindow={this.openInfoWindow}
            toggleMenu={this.toggleMenu}
            closeInfoWindow={this.closeInfoWindow}
          />
            <div
              id="map"
              tabIndex="0"
              role="application"
              aria-label="Map with restaurants"
            />
        </div>
      </div>
    );
  }
}

export default App;

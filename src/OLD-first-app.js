import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    map: null
  }

  componentWillReceiveProps({isScriptLoadSucceed}){
    // Constructor creates a new map - only center and zoom are required.
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -25.958295, lng: 32.591222},
      zoom: 14,
    });

    this.setState({
      map: map
    })

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
          </div>

          <div id="map"></div>
        </div>
      </div>
    );
  }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?v=3&libraries=places&key=AIzaSyB8u8SHJ767vZjqYAHapTSCLFDDwXVCt-E`]
)(App);

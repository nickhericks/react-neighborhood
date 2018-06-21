import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem";
import FacebookProvider, { Like } from 'react-facebook-sdk';
import Example from './LikeButton.js';


class RestaurantList extends Component {

  state = {
    locations: "",
    query: "",
    suggestions: true
  };

  filterLocations = this.filterLocations.bind(this);


  /**
   * Filter Locations based on user query
   */
  filterLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    var locations = [];
    this.props.alllocations.forEach(function(location) {
      if (location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.alllocations
    });
  }

  /**
   * Render function of LocationList
   */
  render() {
    var locationlist = this.state.locations.map(function(listItem, index) {
      return (
        <div key={index + 2000}>
          <RestaurantItem
            key={index}
            openInfoWindow={this.props.openInfoWindow.bind(this)}
            data={listItem}

          />


        </div>

      );
    }, this);

    return (
      <div className="side-menu">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-input"
          type="text"
          placeholder="Filter restaurants by name"
          value={this.state.query}
          onChange={this.filterLocations}
        />
        <ul className="side-list">
          {this.state.suggestions && locationlist}
        </ul>
      </div>
    );
  }
}

export default RestaurantList;

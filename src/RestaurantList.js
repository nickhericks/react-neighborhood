import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem";

// React Component for listing restuarants in side bar menu
class RestaurantList extends Component {

  state = {
    locations: "",
    query: "",
    suggestions: true
  };

  filterLocations = this.filterLocations.bind(this);

   // Filter list of restaurants based on query
  filterLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    var locations = [];
    this.props.allLocations.forEach(function(location) {
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

  UNSAFE_componentWillMount() {
    this.setState({
      locations: this.props.allLocations
    });
  }

  render() {
    var locationlist = this.state.locations.map(function(listItem, index) {
      return (
        <RestaurantItem
          key={index}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
          toggleMenu={this.props.toggleMenu}
          data={listItem}
        />
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
        <div
          className="footer">
          <span>Facebook data provided via Facebook API</span>
        </div>
      </div>
    );
  }
}

export default RestaurantList;

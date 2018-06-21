import React from "react";
import FacebookProvider, { Like } from 'react-facebook-sdk';
import Example from './LikeButton.js';
import './App.css';


class RestaurantItem extends React.Component {
  /**
   * Render function of Place
   */
  render() {
    return (
      <li className="side-item">
        <div
          role="button"
          className="place"
          tabIndex="0"
          onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
          onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
        >
        {this.props.data.name}
        </div>
        {console.log([this.props.data])}
        <Example
          key={this.props.data.id}
          fburl={this.props.data.fburl}
        />
      </li>
    );
  }
}

export default RestaurantItem;

import React from "react";
import FacebookProvider, { Like } from 'react-facebook';
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
          onKeyPress={this.props.openInfoWindow.bind(this, this.props.data)}
          onClick={this.props.openInfoWindow.bind(this, this.props.data)}
          // onClick={this.props.toggleMenu.bind()}
        >
        {this.props.data.name}

        <Example
          key={this.props.data.id}
          fburl={this.props.data.fburl}
        />
        </div>

      </li>
    );
  }
}

export default RestaurantItem;

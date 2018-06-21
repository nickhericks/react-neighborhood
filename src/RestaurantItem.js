import React from "react";
import FacebookLikes from './LikeButton.js';
import './App.css';

// React component for each restaurant in list
class RestaurantItem extends React.Component {
  render() {
    return (
      <li className="side-item">
        <div
          role="button"
          className="place"
          tabIndex="0"
          onKeyPress={this.props.openInfoWindow.bind(this, this.props.data)}
          onClick={this.props.openInfoWindow.bind(this, this.props.data)}
        >

        {this.props.data.name}

        <FacebookLikes
          key={this.props.data.id}
          fburl={this.props.data.fburl}
        />
        </div>
      </li>
    );
  }
}

export default RestaurantItem;

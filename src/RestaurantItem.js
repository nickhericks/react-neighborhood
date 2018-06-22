import React from "react";
import FacebookLikes from './LikeButton.js';
// import FbError from './FbError.js';
import { Offline, Online } from 'react-detect-offline';
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
          <div className="list-item-title">{this.props.data.name}</div>
          <Online>
            <FacebookLikes
              key={this.props.data.id}
              fburl={this.props.data.fburl}
            >

            </FacebookLikes>
          </Online>
          <Offline>
            <span className="fb-offline-warning">Facebook data not available offline</span>
          </Offline>
        </div>
      </li>
    );
  }
}

export default RestaurantItem;

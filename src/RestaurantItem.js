import React from "react";
import FacebookLikes from './LikeButton.js';
// import FbError from './FbError.js';
import './App.css';

// React component for each restaurant in list
class RestaurantItem extends React.Component {

  componentDidMount() {
    // if (this.props.data !== prevProps.data) {
    //   this.fetchData(this.props.data);
    // }
    var fbDiv = document.querySelector('.fb_iframe_widget');
    console.log(fbDiv)
  }

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
          <span className="list-item-title">{this.props.data.name}</span>
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

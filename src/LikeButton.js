import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook';

// React Component to display Facebook API data on number of FB Likes
// Also displays FB Friends that Like it with user image
export default class FacebookLikes extends Component {
  render() {
    return (
      <FacebookProvider appId="722732681451427">
        <Like
          href={this.props.fburl}
          colorScheme="light"
          // showFaces
          // share
          // optionally display larger buttons only with counter
          // size="large"
          // layout="button_count"
          width="225px"
        />

      </FacebookProvider>
    );
  }
}

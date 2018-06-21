import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook';

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="722732681451427">
        <Like
          href={this.props.fburl}
          colorScheme="light"
          showFaces
          share
          // size="large"
          // layout="button_count"
          width="225px"
        />
      </FacebookProvider>
    );
  }
}

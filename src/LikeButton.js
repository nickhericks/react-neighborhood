import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook-sdk';

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="722732681451427">
        <Like href={this.props.fburl} colorScheme="light" showFaces share />
        {console.log(this.props.fburl)}
      </FacebookProvider>
    );
  }
}

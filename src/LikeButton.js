import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook-sdk';

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="722732681451427">
        <Like href="http://www.facebook.com/105533049989334" colorScheme="dark" showFaces share />
        {console.log('hi', this)}
      </FacebookProvider>
    );
  }
}

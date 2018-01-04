import React, { Component } from 'react';
import PartialPost from './PartialPost'

class FullPost extends Component {

  render(){
    return (
      <div>
        <PartialPost />
        <PartialPost />
        <PartialPost />
      </div>
    )
  }
}

export default FullPost;

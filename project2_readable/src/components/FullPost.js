import React, { Component } from 'react';
import Post from ''

class FullPost extends Component {

  render(){
    return (
      <div>
        <div>{this.props.match.params.post_id}</div>
        {/*posts.map(post=>{
          return (
            <Post />
          )
        })*/}
      </div>
    )
  }
}

export default FullPost;

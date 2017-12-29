import React, { Component } from 'react';
import Post from ''

class FullPost extends Component {
  const props = this.props;
  const posts = [];

  render(){
    return (
      <div>
        <div>{props.match.params.post_id}</div>
        {posts.map(post=>{
          return (
            <Post />
          )
        })}
      </div>
    )
  }
}

export default FullPost;

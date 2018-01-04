import React, { Component } from 'react';

class Post extends Component {

  render(){
    console.log(this.props.match.params);
    return (
      <div>
        <div>PostDetail{this.props.match ? this.props.match.params.post_id : ""}</div>
      </div>
    )
  }
}

export default Post;

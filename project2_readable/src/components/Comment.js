import React, { Component } from 'react';
import { connect } from 'react-redux'

class Comment extends Component {

  render(){
    const { id, timestamp, body, author, voteScore, deleted } = this.props.data
    return (
      <div className='container'>
        <div>{body}</div>
        <div>Current Score: <button>Vote Up</button>{voteScore}<button>Vote Down</button></div>
        <div>{author}</div>
        <div>Time posted: {timestamp}</div>
        <div><button>Edit comment</button><button>Delete comment</button></div>
      </div>
    )
  }
}

export default Comment;

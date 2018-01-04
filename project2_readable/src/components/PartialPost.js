import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PartialPost extends Component {


  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    return (
      !deleted ?
      (<div className='container'>
        <div><Link to={`${category}/${id}`}>{title}</Link> by {author}</div>
        <div><button>Vote Up</button>Current Score: {voteScore}<button>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button>Edit Post</button><button>Delete Post</button></div>
        <div>Time posted: {timestamp}</div>
      </div>) :
      ""
    )
  }
}

export default PartialPost;

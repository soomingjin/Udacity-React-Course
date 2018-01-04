import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Post extends Component {
  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    const postId = this.props.match ? this.props.match.params.post_id : "";
    return (
      <div className='container'>
        <div><Link to={`${category}/${id}`}>{title}</Link> by {author}</div>
        <div>{body}</div>
        <div><button>Vote Up</button>Current Score: {voteScore}<button>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button>Edit Post</button><button>Delete Post</button></div>
        <div>Time posted: {timestamp}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state['posts'][ownProps.match.params.post_id]
  }
}
export default connect(mapStateToProps)(Post);

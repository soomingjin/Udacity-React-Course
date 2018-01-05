import React, { Component } from 'react';
import { connect } from 'react-redux'

class Comments extends Component {
  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    return (
      <div className='container'>
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
    data: state['comments']
  }
}
export default connect(mapStateToProps)(Comments);

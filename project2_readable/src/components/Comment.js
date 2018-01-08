import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { voteComment } from '../actions'

class Comment extends Component {

  handleUpVote = (id, e) => {
    console.log(id);
    api.voteComment(id, "upVote").then((data) => this.props.voteComment(id, data))
  }

  handleDownVote = (id, e) => {
    api.voteComment(id, "downVote").then((data) => this.props.voteComment(id, data))
  }

  render(){
    const { id, timestamp, body, author, voteScore, deleted } = this.props.data
    return (
      <div className='container'>
        <div>{body}</div>
        <div>Current Score: <button onClick={this.handleUpVote.bind(this, id)}>Vote Up</button>{voteScore}<button onClick={this.handleDownVote.bind(this, id)}>Vote Down</button></div>
        <div>{author}</div>
        <div>Time posted: {timestamp}</div>
        <div><button>Edit comment</button><button>Delete comment</button></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.comments[ownProps.id]
  }
}
export default connect(mapStateToProps, { voteComment })(Comment);

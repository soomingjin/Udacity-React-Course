import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { voteComment, removeComment } from '../actions'

class Comment extends Component {

  handleUpVote = (id, e) => {
    api.voteComment(id, "upVote").then((data) => this.props.voteComment(data.id, data))
  }

  handleDownVote = (id, e) => {
    api.voteComment(id, "downVote").then((data) => this.props.voteComment(data.id, data))
  }

  handleDeleteComment = (id, e) => {
    api.removeComment(id).then((data) => this.props.removeComment(data.id))
  }

  render(){
    const { id, timestamp, body, author, voteScore, deleted } = this.props.data
    return (
      <div className='container'>
        <div>{body}</div>
        <div>Current Score: <button onClick={this.handleUpVote.bind(this, id)}>Vote Up</button>{voteScore}<button onClick={this.handleDownVote.bind(this, id)}>Vote Down</button></div>
        <div>{author}</div>
        <div>Time posted: {new Date(timestamp).toLocaleString('en-us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
        </div>
        <div><button>Edit comment</button><button onClick={this.handleDeleteComment.bind(this, id)}>Delete comment</button></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.comments[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch) => ({
  voteComment: (id, data) => dispatch(voteComment(id, data)),
  removeComment: id => dispatch(removeComment(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment);

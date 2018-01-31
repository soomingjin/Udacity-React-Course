import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { voteComment, removeComment } from '../actions'
import AddEditComment from './AddEditComment'

class Comment extends Component {
  state = {
    isEditing: false,
  }
  handleUpVote = (id, e) => {
    api.voteComment(id, "upVote").then((data) => this.props.voteComment(data.id, data))
  }

  handleDownVote = (id, e) => {
    api.voteComment(id, "downVote").then((data) => this.props.voteComment(data.id, data))
  }

  handleDeleteComment = (id, e) => {
    api.removeComment(id).then((data) => this.props.removeComment(data.id))
  }

  handleEditPost = (id, e) => {
    this.setState((prevState) => ({isEditing: !prevState.isEditing}))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      isEditing: false,
    }))
  }
  render(){
    const { id, timestamp, body, author, voteScore, deleted } = this.props.data
    const { isEditing } = this.state;
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
        <div><button onClick={this.handleEditPost.bind(this, id)}>Edit comment</button><button onClick={this.handleDeleteComment.bind(this, id)}>Delete comment</button></div>
        <Modal
          className='modal'
          isOpen={isEditing}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
          {isEditing && <AddEditComment data={this.props.data} />}
        </Modal>
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

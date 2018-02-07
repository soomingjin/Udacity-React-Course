import React, {Component} from 'react';
import * as api from '../utils/api'
import {connect} from 'react-redux'
import {Modal, ModalBody} from 'reactstrap';
import {voteComment, removeComment, updatePost, getAllPosts} from '../actions'
import AddEditComment from './AddEditComment'

class Comment extends Component {
  state = {
    isEditing: false
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

  handleEditComment = (id, e) => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }))
  }

  toggleCommentModal = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }))
  }
  render() {
    const {id, timestamp, body, author, voteScore} = this.props.data
    const {isEditing} = this.state;
    return (<div className='comment card col-12'>
      <div className='card-body'>
        <div>{body}</div>
        <div>Author: {author}</div>
        <div>Time posted: {
            new Date(timestamp).toLocaleString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        </div>
        <div className='row justify-content-between'>
          <div className='col-4'>Current Score:
            <button type="button" className="btn btn-light" onClick={this.handleUpVote.bind(this, id)}>
              <i className="fas fa-thumbs-up"></i>
            </button>
            {voteScore}
            <button type="button" className="btn btn-light" onClick={this.handleDownVote.bind(this, id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
          </div>
          <div className="btn-group col-2" role="group">
            <button type="button" className="btn btn-light" onClick={this.handleEditComment.bind(this, id)}>
              <span className="far fa-edit"></span>
            </button>
            <button type="button" className="btn btn-danger" onClick={this.handleDeleteComment.bind(this, id)}>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isEditing} toggle={this.toggleCommentModal} contentLabel='Modal' ariaHideApp={false}>
        <ModalBody>
          {isEditing && <AddEditComment data={this.props.data}/>}
        </ModalBody>
      </Modal>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.comments[ownProps.id]
  }
}

export default connect(mapStateToProps, {voteComment, removeComment, getAllPosts})(Comment);

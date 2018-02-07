import React, { Component } from 'react';
import * as api from '../utils/api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap';
import { votePost, removePost } from '../actions'
import AddEditPost from './AddEditPost'

class PartialPost extends Component {
  state = {
      isEditing: false,
  }

  handleUpVote = (id, e) => {
    api.votePost(id, "upVote").then((data) => this.props.votePost(id, data))
  }

  handleDownVote = (id, e) => {
    api.votePost(id, "downVote").then((data) => this.props.votePost(id, data))
  }

  handleDeletePost = (id, e) => {
    api.removePost(id).then((data) => this.props.removePost(data.id))
  }

  handleEditPost = (id, e) => {
    this.setState((prevState) => ({isEditing: !prevState.isEditing}))
  }

  togglePostModal = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }))
  }
  render(){
    const { id, timestamp, title, author, category, voteScore, deleted, commentCount } = this.props.data
    const { isEditing } = this.state
    return (
      !deleted ?
      (<div className='card partial-post'>
        <div className="card-header">
          <Link to={`${category}/${id}`}>{title}</Link> by {author}
        </div>
        <div className='card-body'>
          <div>Comment Count: {commentCount}</div>
          <div>Time posted: {new Date(timestamp).toLocaleString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          })}
          </div>
          <div className='row justify-content-between'>
            <div className='col-4'>Current Score:
              <button type="button" className="btn btn-light" onClick={this.handleUpVote.bind(this, id)}><i className="fas fa-thumbs-up"></i></button>
              {voteScore}
              <button type="button" className="btn btn-light" onClick={this.handleDownVote.bind(this, id)}><i className="fas fa-thumbs-down"></i></button>
            </div>
            <div className="btn-group col-2" role="group">
              <button type="button" className="btn btn-light" onClick={this.handleEditPost.bind(this, id)}><span className="far fa-edit"></span></button>
              <button type="button" className="btn btn-danger"  onClick={this.handleDeletePost.bind(this, id)}><i className="far fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isEditing}
          toggle={this.togglePostModal}
        >
        {/* If is editing, then display Modal and pass in props of post details*/}
          <ModalBody>
            <AddEditPost data={this.props.data}/>
          </ModalBody>
        </Modal>
      </div>) :
      ""
    )
  }
}


export default connect(null, { votePost, removePost })(PartialPost);

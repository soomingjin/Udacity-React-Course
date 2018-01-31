import React, { Component } from 'react';
import * as api from '../utils/api'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, removePost } from '../actions'
import AddEditPost from './AddEditPost'

class PartialPost extends Component {
  state = {
      isEditing: false,
  }

  componentWillMount () {

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

  closePostModal = () => {
    this.setState(() => ({
      isEditing: false,
    }))
  }
  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    const { isEditing } = this.state
    return (
      !deleted ?
      (<div className='container'>
        <div><Link to={`${category}/${id}`}>{title}</Link> by {author}</div>
        <div>Current Score: <button className='upVote' onClick={this.handleUpVote.bind(this, id)}>Vote Up</button>{voteScore}<button className='downVote' onClick={this.handleDownVote.bind(this, id)}>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button onClick={this.handleEditPost.bind(this, id)}>Edit Post</button><button onClick={this.handleDeletePost.bind(this, id)}> Delete Post</button></div>
        <div>Time posted: {new Date(timestamp).toLocaleString('en-us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
        </div>
        <Modal
          className='modal'
          isOpen={isEditing}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
        {/* If is editing, then display Modal and pass in props of post details*/}
          {isEditing && <AddEditPost data={this.props.data}/>}
        </Modal>
      </div>) :
      ""
    )
  }
}


export default connect(null, { votePost, removePost })(PartialPost);

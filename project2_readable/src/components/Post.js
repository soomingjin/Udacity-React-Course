import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import Comments from './Comments'
import { getAllPosts, votePost, removePost } from '../actions';
import AddEditComment from './AddEditComment'

class Post extends Component {
  state = {
    commentModalOpen: false,
  }

  componentWillMount () {
    api.getPosts().then(data => this.props.getAllPosts(data))
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true,
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
    }))
  }

  handleUpVote = (id, e) => {
    api.votePost(id, "upVote").then((data) => this.props.votePost(id, data))
  }

  handleDownVote = (id, e) => {
    api.votePost(id, "downVote").then((data) => this.props.votePost(id, data))
  }

  handleDeletePost = (id, e) => {
    api.removePost(id).then((data) => this.props.removePost(data.id))
    //Go back to home
    this.props.history.push('/')
  }

  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data ? this.props.data : {}
    const {commentModalOpen } = this.state
    const postId = this.props.match ? this.props.match.params.post_id : "";
    return (
      <div className='container'>
        <h2>Post</h2>
        <Link to="/" replace={false}>Back</Link>
        <div>{title} by {author}</div>
        <div>{body}</div>
        <div>Current Score: <button onClick={this.handleUpVote.bind(this, id)}>Vote Up</button>{voteScore}<button onClick={this.handleDownVote.bind(this, id)}>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button>Edit Post</button><button onClick={this.handleDeletePost.bind(this, id)}>Delete Post</button></div>
        <div>Time posted: {new Date(timestamp).toLocaleString('en-us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
        </div>
        <button onClick={this.openCommentModal}>Add Comment</button>
        <Comments />
        <Modal
          className='modal'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
          {commentModalOpen && <AddEditComment parentId={id} />}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: Object.values(state.posts).filter((p) => p.id === ownProps.match.params.post_id)[0],
  }
}
export default connect(mapStateToProps, { getAllPosts, votePost, removePost })(Post);

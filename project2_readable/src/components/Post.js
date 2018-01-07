import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import { fetchPosts, getCommentsForPost } from '../actions';
import AddEditComment from './AddEditComment'

class Post extends Component {
  state = {
    commentModalOpen: false,
  }
  componentWillMount () {
    this.props.fetchPosts()
    // api.getCommentsForPost(this.props.data.id).then((data) => {
    //   this.props.getCommentsForPost(data)
    // })
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
  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    const {commentModalOpen } = this.state
    const postId = this.props.match ? this.props.match.params.post_id : "";
    return (
      <div className='container'>
        <button>Back</button>
        <div>{title} by {author}</div>
        <div>{body}</div>
        <div>Current Score: <button>Vote Up</button>{voteScore}<button>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button>Edit Post</button><button>Delete Post</button></div>
        <div>Time posted: {timestamp}</div>
        <button onClick={this.openCommentModal}>Add Comment</button>
        <Comments parentId={this.props.data.id} />
        <Modal
          className='modal'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
          {commentModalOpen && <AddEditComment />}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    data: Object.values(state.posts).filter((p) => p.id === ownProps.match.params.post_id)[0],
  }
}
export default connect(mapStateToProps, { fetchPosts, })(Post);

import React, { Component } from 'react';
import * as api from '../utils/api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, removePost } from '../actions'

class PartialPost extends Component {

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
    
  }

  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
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
      </div>) :
      ""
    )
  }
}


export default connect(null, { votePost, removePost })(PartialPost);

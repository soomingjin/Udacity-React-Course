import React, { Component } from 'react';
import * as api from '../utils/api'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost } from '../actions'

class PartialPost extends Component {

  componentWillMount () {

  }

  handleUpVote = (id, e) => {
    api.votePost(id, "upVote").then((data) => this.props.votePost(id, data))
  }
  handleDownVote = (id, e) => {
    api.votePost(id, "downVote").then((data) => this.props.votePost(id, data))
  }

  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data
    return (
      !deleted ?
      (<div className='container'>
        <div><Link to={`${category}/${id}`}>{title}</Link> by {author}</div>
        <div>Current Score: <button className='upVote' onClick={this.handleUpVote.bind(this, id)}>Vote Up</button>{voteScore}<button className='downVote' onClick={this.handleDownVote.bind(this, id)}>Vote Down</button></div>
        <div>Comment Count: {commentCount}</div>
        <div><button>Edit Post</button><button>Delete Post</button></div>
        <div>Time posted: {timestamp}</div>
      </div>) :
      ""
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {}
}

export default connect(null, { votePost })(PartialPost);

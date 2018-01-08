import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addPost, editPost } from '../actions'

class AddEditPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "react",
  }

  handleCategoryChange = (e) => {
    this.setState({category: e.currentTarget.value})
  }
  handleSubmit = (e) => {

  }
  render(){
    return (
      <div>
        <form method='post'>
          <label>Post</label>
          <input placeholder='title' type='text'/>
          <input placeholder='body' type='text'/>
          <input placeholder='author' type='text'/>
          <select value={this.state.category} onChange={this.handleCategoryChange}>
            <option value='react'>React</option>
            <option value='redux'>Redux</option>
            <option value='udacity'>Udacity</option>
          </select>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default connect(null, { addPost, editPost })(AddEditPost);

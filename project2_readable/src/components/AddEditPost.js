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
    edit: false,
  }

  handleCategoryChange = (e) => {
    this.setState({category: e.currentTarget.value})
  }

  handleSubmit = () => {
    delete this.state['edit']
    const payload = {
      ...this.state,
      timestamp: Date.now(),
      id: "randoms"
    }
    api.addPost(payload).then(data => addPost(data))
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }
  render(){
    return (
      <div>
        <form>
          <label>Post</label>
          <input name='title' placeholder='title' type='text' onChange={this.handleInputChange}/>
          <input name='body' placeholder='body' type='text' onChange={this.handleInputChange}/>
          <input name='author' placeholder='author' type='text' onChange={this.handleInputChange}/>
          <select name='category' value={this.state.category} onChange={this.handleInputChange}>
            <option value='react'>React</option>
            <option value='redux'>Redux</option>
            <option value='udacity'>Udacity</option>
          </select>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { addPost, editPost })(AddEditPost);

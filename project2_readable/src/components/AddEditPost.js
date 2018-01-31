import React, { Component } from 'react';
import uuid from 'uuid';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addPost, editPost } from '../actions'

class AddEditPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "react",
    id: "",
  }

  handleCategoryChange = (e) => {
    this.setState({category: e.currentTarget.value})
  }

  handleSubmit = () => {
    let payload = {};
    if (this.props.currentPostIds.includes(this.state.id)){
      payload = {
        ...this.state,
      }
      api.editPost(payload.id, payload).then(data => editPost(data.id, data))
    } else {
      payload = {
        ...this.state,
        timestamp: Date.now(),
      }
      api.addPost(payload).then(data => addPost(data))
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  componentWillMount () {
    this.setState({
      id: uuid(),
    })

    if (this.props.data) {
      const { title, body, author, category, id } = this.props.data
      this.setState({
       title,
       body,
       author,
       category,
       id,
      })
    }
  }

  componentWillReceiveProps( nextProps ) {
  }

  render(){
    const { title, body, author, category } = this.state;
    return (
      <div>
        <form>
          <label>Post</label>
          <input name='title' placeholder='title' type='text' onChange={this.handleInputChange} value={title}/>
          <input name='body' placeholder='body' type='text' onChange={this.handleInputChange} value={body}/>
          <input name='author' placeholder='author' type='text' onChange={this.handleInputChange} value={author}/>
          <select name='category' value={category} onChange={this.handleInputChange}>
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

const mapStateToProps = (state) => ({
  currentPostIds: Object.keys(state.posts),
})

export default connect(mapStateToProps, { addPost, editPost })(AddEditPost);

import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addComment, editComment } from '../actions'

class AddEditComment extends Component {
  state = {
    body: "",
    author: "",
    edit: false,
  }

  handleSubmit = () => {
    delete this.state['edit']
    const payload = {
      ...this.state,
      timestamp: Date.now(),
      id: "randoms",
      parentId: this.props.parentId
    }
    api.addComment(payload).then(data => addComment(data))

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
        <form method='post'>
          <input name='body' placeholder='body' type='text' onChange={this.handleInputChange}/>
          <input name='author' placeholder='author' type='text' onChange={this.handleInputChange}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default connect(null, { addComment, editComment })(AddEditComment);

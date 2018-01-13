import React, { Component } from 'react';
import uuid from 'uuid';
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

  componentWillMount(){
    this.setState({
      id: uuid(),
    })
  }

  render(){
    return (
      <div>
        <form>
          <input name='body' placeholder='body' type='text' onChange={this.handleInputChange}/>
          <input name='author' placeholder='author' type='text' onChange={this.handleInputChange}/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { addComment, editComment })(AddEditComment);

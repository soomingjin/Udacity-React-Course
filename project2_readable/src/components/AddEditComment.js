import React, { Component } from 'react';
import uuid from 'uuid';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addComment, editComment } from '../actions'

class AddEditComment extends Component {
  state = {
    body: "",
    author: "",
    id: "",
  }

  handleSubmit = () => {
    let payload = {};
    if (this.props.currentCommentIds.includes(this.state.id)){
      payload = {
        ...this.state,
      }
      api.editComment(payload.id, payload).then(data => editComment(data.id, data))
    } else {
      payload = {
        ...this.state,
        timestamp: Date.now(),
        parentId: this.props.parentId
      }
      api.addComment(payload).then(data => addComment(data))
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

  componentWillMount(){
    this.setState({
      id: uuid(),
    })
    if (this.props.data) {
      const { body, author, id } = this.props.data
      this.setState({
       body,
       author,
       id,
      })
    }
  }

  render(){
    const { body, author } = this.state;
    return (
      <div>
        <form>
          <input name='body' placeholder='body' value={body} type='text' onChange={this.handleInputChange}/>
          <input name='author' placeholder='author' value={author} type='text' onChange={this.handleInputChange}/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCommentIds: Object.keys(state.comments),
})

export default connect(mapStateToProps, { addComment, editComment })(AddEditComment);

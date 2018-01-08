import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addComment, editComment } from '../actions'

class AddEditComment extends Component {

  handleSubmit = (e) => {

  }
  render(){
    return (
      <div>
        <form method='post'>
          <input placeholder='body' type='text'/>
          <input placeholder='author' type='text'/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default connect(null, { addComment, editComment })(AddEditComment);

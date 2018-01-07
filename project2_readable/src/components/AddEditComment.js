import React, { Component } from 'react';

class AddEditComment extends Component {

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

export default AddEditComment;

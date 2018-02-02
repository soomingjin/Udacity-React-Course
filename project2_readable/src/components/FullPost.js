import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import PartialPost from './PartialPost';
import { getSortedPosts } from '../selectors'
import { changeSort } from '../actions'

class FullPost extends Component {
  state = {
    value: 'voteScore',
  }

  onSortChange = (e) => {
    const sortMethod = e.target.value;
    this.setState(() => ({
      value: sortMethod,
    }))
    this.props.changeSort(sortMethod)
  }

  render(){
    return (
      <div>
        <div className='row'>
          <div className='col-4 float-right'>
            <label for='sort' className=''><span>Sort by: </span></label>
            <select classaName='' value={this.state.value} name='sort' className='sort' type='select' onChange={this.onSortChange}>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Latest</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {this.props.posts.map((post) => (
              <PartialPost data={post}/>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  const category = ownProps.category;
  if(category) {
    return {
      // Always use filter before mapping to choose the correct values
      posts: getSortedPosts(state).filter(post => post.category === category)
    }
  } else {
    return {
      posts: getSortedPosts(state)
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeSort: sortMethod => dispatch(changeSort(sortMethod)),
})
export default connect(mapStateToProps, mapDispatchToProps)(FullPost);

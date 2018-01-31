import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <div className='control-panel'>
          <label>Sort by: </label><select value={this.state.value} id='sort' className='sort' onChange={this.onSortChange}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Timestamp</option>
          </select>
        </div>
        {this.props.posts.map((post) => (<PartialPost key={post.id} data={post}/>))}
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

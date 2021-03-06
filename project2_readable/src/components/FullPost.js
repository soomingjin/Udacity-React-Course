import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import PartialPost from './PartialPost';
import {getSortedPosts} from '../selectors'
import {changeSort} from '../actions'

class FullPost extends Component {
  state = {
    value: 'voteScore'
  }

  onSortChange = (e) => {
    const sortMethod = e.target.value;
    this.setState(() => ({value: sortMethod}))
    this.props.changeSort(sortMethod)
  }

  render() {
    return (
      !this.props.hasError
      ? (<div>
        <div className='row'>
          <div className='col-4 float-right'>
            <label className=''>
              <span>Sort by:
              </span>
            </label>
            <select className='sort' value={this.state.value} name='sort' type='select' onChange={this.onSortChange}>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Latest</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {this.props.posts.map((post) => (<PartialPost key={post.id} data={post}/>))}
          </div>
        </div>
      </div>)
      : (<Redirect from='*' to='/404'/>))
  }
}

const mapStateToProps = (state, ownProps) => {
  const category = ownProps.category;
  if (Object.keys(state.categories).includes(category)) {
    return {
      // Always use filter before mapping to choose the correct values
      posts: getSortedPosts(state).filter(post => post.category === category)
    }
  } else if (category) {
    return {hasError: true}
  }
  return {posts: getSortedPosts(state)}
}

export default connect(mapStateToProps, {changeSort})(FullPost);

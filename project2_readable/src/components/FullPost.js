import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartialPost from './PartialPost';

class FullPost extends Component {

  onSortChange = (sortMethod) => {
    // console.log(document.getElementById('sort').value);
  }

  componentWillMount() {
    // If there is enough time, implement a default sort method that can be configured
    // if(this.props.sortMethod) {
    //   document.getElementById('sort').selectedIndex = this.props.sortMethod;
    // }
  }
  render(){
    console.log(this.props.posts);
    return (
      <div>
        <div className='control-panel'>
          <select value='voteScore' id='sort' className='sort' onChange={(e) => this.onSortChange(e.target.value)}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Timestamp</option>
          </select>
          <button>Add New Post</button>
        </div>
        {this.props.posts.map((post) => (<PartialPost key={post.id}/>))}
      </div>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  const category = ownProps.category;
  let posts = Object.keys(state['posts']);
  if(category) {
    return {
      //Always use filter before mapping to choose the correct values
      posts: Object.keys(state['posts']).filter((postId) => (state['posts'][postId].category === category)).map((postId) => (state['posts'][postId]))
    }
  } else {
    return {
      posts:  Object.keys(state['posts']).map((postId) => {
        return state['posts'][postId]
      })
      // categories: Object.keys(state).filter((key) => key === "category").map((key) => {
      //   return Object.keys(state[key])
      // })
    }
  }
}

export default connect(mapStateToProps)(FullPost);

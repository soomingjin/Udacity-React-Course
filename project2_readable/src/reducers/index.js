import { combineReducers } from 'redux'

import {
  GET_ALL_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

//fetch the categories first


const initialReadableState = {
  'categories': [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
  ],
  'comments': {
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    },
  },
  'posts': {}
}
//API call => response => dispatch action w/ received data => action is called => reducer is called => store is updated => mapStateToProps updates view
const postReducer = (state=initialReadableState, action) => {
  const {id, timestamp, title, body, author, category, posts} = action;
  switch(action.type){
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: posts,
      }
    case EDIT_POST:
      return state
    case REMOVE_POST:
      return state
    default:
      return state
  }
}
const commentReducer = (posts=initialReadableState, action) => {
  const {id, timestamp, title, body, author, category} = action;
  switch(action.type){
    case ADD_COMMENT:
      return {
        ...posts,
        [id]: {
          ...posts[id],
          id,
          timestamp,
          title,
          body,
          author,
          category,
        }
      }
    case EDIT_COMMENT:
      return posts
    case REMOVE_COMMENT:
      return posts
    default:
      return posts
  }
}

export default postReducer

// export default combineReducers({
//   postReducer,
// })

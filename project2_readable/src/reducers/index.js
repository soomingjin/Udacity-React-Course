import { combineReducers } from 'redux'

import {
  GET_ALL_POSTS,
  GET_CATEGORIES,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

const defaultState = {
  'categories': [],
  'comments': {},
  'posts': {}
}
// const initialReadableState = {
//   'categories': [
//       {
//         name: 'react',
//         path: 'react'
//       },
//       {
//         name: 'redux',
//         path: 'redux'
//       },
//       {
//         name: 'udacity',
//         path: 'udacity'
//       }
//   ],
//   'comments': {
//     "894tuq4ut84ut8v4t8wun89g": {
//       id: '894tuq4ut84ut8v4t8wun89g',
//       parentId: "8xf0y6ziyjabvozdd253nd",
//       timestamp: 1468166872634,
//       body: 'Hi there! I am a COMMENT.',
//       author: 'thingtwo',
//       voteScore: 6,
//       deleted: false,
//       parentDeleted: false
//     },
//     "8tu4bsun805n8un48ve89": {
//       id: '8tu4bsun805n8un48ve89',
//       parentId: "8xf0y6ziyjabvozdd253nd",
//       timestamp: 1469479767190,
//       body: 'Comments. Are. Cool.',
//       author: 'thingone',
//       voteScore: -5,
//       deleted: false,
//       parentDeleted: false
//     },
//   },
//   'posts': {}
// }

//API call => response => dispatch action w/ received data => action is called => reducer is called => store is updated => mapStateToProps updates view
const posts = (state={}, action) => {
  const {id, posts, post} = action;
  switch(action.type){
    case GET_ALL_POSTS:
      return {
        ...state,
        ...posts,
      }
    case ADD_POST:
      return {
        ...state,
        [id]: {
          ...post
        }
      }
    case EDIT_POST:
      return {
        ...state,
        [id]: {
          ...post[id],
          ...post
        }
      }
    case REMOVE_POST:
      return {
        ...state.posts.filter((currentPost) => currentPost.id !== post.id)
      }
    default:
      return state
  }
}
const comments = (state={}, action) => {
  const {id, comments, comment } = action;
  switch(action.type){
    case ADD_COMMENT:
      return state
    case EDIT_COMMENT:
      return state
    case REMOVE_COMMENT:
      return state
    default:
      return state
  }
}

const categories = (state = {}, action) => {
  const { categories } = action;
  switch(action.type){
    case GET_CATEGORIES:
      return {
        ...state,
        ...categories,
      }
    default:
      return state
  }
}
// export default postReducer

export default combineReducers({
  categories,
  posts,
  comments,
})

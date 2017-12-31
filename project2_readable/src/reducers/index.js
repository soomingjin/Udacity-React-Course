import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

//fetch the categories first


const initialReadableState = {
  'category': {
    'react': {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
      }
    },
    'redux': {
      "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
      }
    }
  },
  'comment': {
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
    }
  }
}

const postReducer = (posts=initialReadableState, action) => {
  const {id, timestamp, title, body, author, category} = action;
  switch(action.type){
    case ADD_POST:
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
    case EDIT_POST:
      return posts
    case REMOVE_POST:
      return posts
    default:
      return posts
  }
}

export default postReducer

// export default combineReducers({
//   postReducer
// })

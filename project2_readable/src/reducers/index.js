import { combineReducers } from 'redux'

import {
  GET_ALL_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS_FOR_POST,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
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
//         name: '
//         path:
//       },
//   ],
//   'comments': {
//     "894tuq4ut84ut8v4t8wun89g": {
//       id: '894tuq4ut84ut8v4t8wun89g',
//       parentId: "8xf0y6ziyjabvozdd253nd",
//       timestamp:
//       body:
//       author:
//       voteScore:
//       deleted:
//       parentDeleted:
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
        // ...posts.map((post) => {
        //
        //   return {
        //     [post.id]: {
        //       ...post
        //     }
        //   }
        // })
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
          ...state[id],
          ...post
        }
      }
    case REMOVE_POST:
      return {
        ...state.posts.filter((currentPost) => currentPost.id !== post.id)
      }
    case VOTE_POST:
      return {
        ...state,
        [id] : {
          ...post
        }
      }
    default:
      return state
  }
}
const comments = (state={}, action) => {
  const {id, comments, comment } = action;
  switch(action.type){
    case GET_COMMENTS_FOR_POST:
      return {
        ...comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [id] : {
          ...comment
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          ...comment
        }
      }
    case REMOVE_COMMENT:
      return {
        ...state.comments.filter((currentComment) => currentComment.id !== comment.id)
      }
    case VOTE_COMMENT:
      return {
        ...state,
        [id] : {
          ...state[id],
          // [id]['voteScore']:  vote === "voteUp" ? [id]['voteScore'] + 1 : [id]['voteScore'] - 1
        }
      }
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

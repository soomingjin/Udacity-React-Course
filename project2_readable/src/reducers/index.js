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
  TOGGLE_POST_MODAL,
  TOGGLE_COMMENT_MODAL,
  CHANGE_SORT,
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

const initialModalState = {
  postModalOpen: false,
  commentModalOpen: false,
  editPost: false,
  editComment: false,
  id: "",
}

const initialSortPostTypeState = {
  rule: "voteScore"
}

//API call => response => dispatch action w/ received data => action is called => reducer is called => store is updated => mapStateToProps updates view
const posts = (state={}, action) => {
  const {id, posts, post} = action;
  switch(action.type){
    case GET_ALL_POSTS:
      return {
        ...state,
        ...posts.reduce((previous, current) => {
          previous[current.id] = current
          return previous
        }, {})
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
        [post.id]: {
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
      delete state[id]
      return {
        ...state,
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
        ...comments.reduce((previous, current) => {
          previous[current.id] = current
          return previous
        }, {})
      }
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id] : {
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
      delete state[id]
      return {
        ...state,
      }
    case VOTE_COMMENT:
      return {
        ...state,
        [id] : {
          ...comment
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

const modalMode = (state=initialModalState, action ) => {
  const { id, edit } = action;
  switch(action.type){
    case TOGGLE_POST_MODAL:
      console.log(state);
      return {
        ...state,
        postModalOpen: !state['postModalOpen'],
        editPost: edit,
        id: id,
      }
    case TOGGLE_COMMENT_MODAL:
      return {
        ...state,
        commentModalOpen: !state['commentModalOpen'],
        editComment: edit,
        id: id,
      }
    default:
      return state
  }
}

const sortPostType = (state=initialSortPostTypeState, action) => {
  const { rule } = action
  switch (action.type) {
    case CHANGE_SORT:
      return {
        rule
      }
    default:
      return state
  }
}
export default combineReducers({
  categories,
  posts,
  comments,
  modalMode,
  sortPostType,
})

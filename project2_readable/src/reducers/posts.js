import {
  GET_ALL_POSTS,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  REMOVE_POST,
} from '../actions/types'
//API call => response => dispatch action w/ received data => action is called => reducer is called => store is updated => mapStateToProps updates view
export const posts = (state={}, action) => {
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
          ...post,
        }
      }
    default:
      return state
  }
}

import {
  GET_COMMENTS_FOR_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types'

export const comments = (state={}, action) => {
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

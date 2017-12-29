import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

const postReducer = (posts, action) => {
  switch(action.type){
    case ADD_POST:
      const {id, timestamp, title, body, author, category} = action;

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



export default combineReducers({
})

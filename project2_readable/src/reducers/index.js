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
} from '../actions/types'

import { posts } from './posts'
import { categories } from './categories'
import { comments } from './comments'
import { sortPostType } from './sortPostType'
import { sortCommentsType } from './sortCommentsType'


export default combineReducers({
  categories,
  posts,
  comments,
  sortPostType,
  sortCommentsType,
})

import * as api from '../utils/api'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const REMOVE_POST = "REMOVE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export const getAllPosts = (posts)  => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

//get comments only when needed
export const getCommentsForPost = (comments)  => {
  return {
    type: GET_COMMENTS_FOR_POST,
    comments
  }
}

export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function editPost (id, post) {
  return {
    type: EDIT_POST,
    id,
    post,
  }
}

export function removePost (id) {
  return {
    type: REMOVE_POST,
    id,
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function editComment (id, comment) {
  return {
    type: EDIT_COMMENT,
    id,
    comment,
  }
}

export function removeComment (id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const fetchPosts = () => dispatch => (
    api
    .getPosts()
    .then(posts => dispatch(getAllPosts(posts)))
)

export const fetchCommentsForPost = () => dispatch => (
    api
    .getPosts()
    .then(posts => dispatch(getAllPosts(posts)))
)

export const fetchCategories = () => dispatch => (
  api.getCategories().then(categories => dispatch(getCategories))
)

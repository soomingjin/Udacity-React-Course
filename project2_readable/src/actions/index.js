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
  CHANGE_SORT,
} from './types'

export const changeSort = (rule) => {
  return {
    type: CHANGE_SORT,
    rule
  }
}
export const changeCommentsSort = (rule) => {
  return {
    type: CHANGE_SORT,
    rule
  }
}

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

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  }
}

export const editPost = (id, post) => {
  return {
    type: EDIT_POST,
    id,
    post,
  }
}

export const removePost = (id) => {
  return {
    type: REMOVE_POST,
    id,
  }
}

export const votePost = (id, post) => {
  return {
    type: VOTE_POST,
    id,
    post,
  }
}

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export const editComment = (id, comment) => {
  return {
    type: EDIT_COMMENT,
    id,
    comment,
  }
}

export const removeComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const voteComment = (id, comment) => {
  return {
    type: VOTE_COMMENT,
    id,
    comment,
  }
}

export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const REMOVE_POST = "REMOVE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export function addPost (data) {
  return {
    type: ADD_POST,
  }
}

export function editPost () {
  return {
    type: EDIT_POST,
  }
}

export function removePost () {
  return {
    type: REMOVE_POST,
  }
}

export function addComment () {
  return {
    type: ADD_COMMENT,
  }
}

export function editComment () {
  return {
    type: EDIT_COMMENT,
  }
}

export function removeComment () {
  return {
    type: REMOVE_COMMENT,
  }
}

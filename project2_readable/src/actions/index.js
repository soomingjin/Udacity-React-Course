export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const REMOVE_POST = "REMOVE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export function addPost ({id, timestamp, title, body, author, category}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
  }
}

export function editPost ({id, timestamp, title, body, author, category}) {
  return {
    type: EDIT_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
  }
}

export function removePost ({id}) {
  return {
    type: REMOVE_POST,
    id,
  }
}

export function addComment ({parentId, id, timestamp, body, author}) {
  return {
    type: ADD_COMMENT,
    parentId,
    id,
    timestamp,
    body,
    author,
  }
}

export function editComment ({parentId, id, timestamp, body, author}) {
  return {
    type: EDIT_COMMENT,
    parentId,
    id,
    timestamp,
    body,
    author,
  }
}

export function removeComment ({id}) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

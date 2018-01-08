import axios from 'axios'

export const URL='http://localhost:3001';
export const headers = {
  'Authorization': 'whatever-you-want'
}
export const getPosts = () =>
  axios.get(`${URL}/posts`, {headers})
  .then(res => res.data)
// Why when I use fetch, I use res => res.json() but
// when I use axios, I obtain the data using res.data

export const getSinglePost= (id) =>
  axios.get(`${URL}/posts/${id}`,{headers})
  .then(res => res.data)

export const getCategories = () =>
  axios.get(`${URL}/categories`, {headers})
  .then(res => res.data)

export const getCommentsForPost = (id) =>
    axios.get(`${URL}/posts/${id}/comments/`, {headers})
    .then(res => res.data)

//axios.post(url[, data[, config]])
export const addPost = (post) =>
  axios.post(`${URL}/posts`, post, {headers})
  .then(res => res.data)

// export const addPost = post =>
//     fetch("http://localhost:3001/posts", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(post)
//     }).then(res => res.json);

export const addComment = (comment) =>
  axios.post(`${URL}/comments`, comment, {headers})
  .then(res => res.data)

//data = {title, body}
export const editPost = (id, data) =>
  axios.put(`${URL}/posts/${id}`, data, { headers })
  .then(res => res.data)

  export const editComment = (id, data) =>
    axios.put(`${URL}/comments/${id}`, data, { headers })
    .then(res => res.data)

//vote = "upVote" || "downVote"
export const votePost = (id, vote) =>
  axios.post(`${URL}/posts/${id}`, {option: vote}, { headers })
  .then(res => res.data)

export const voteComment = (id, vote) =>
  axios.post(`${URL}/comments/${id}`, {option: vote}, { headers })
  .then(res => res.data)

export const removePost = (id) =>
  axios.delete(`${URL}/posts/${id}`, { headers })
  .then(res => res.data)

export const removeComment = (id) =>
  axios.delete(`${URL}/comments/${id}`, { headers })
  .then(res => res.data)

export const URL='http://localhost:3001';
export const headers = {
  'Authorization': 'whatever-you-want'
}

export const getPosts = () => {
  return fetch(`${URL}/posts`, {headers})
  .then(res => res.json())
}

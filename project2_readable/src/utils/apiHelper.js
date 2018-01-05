// Contributed by Luis Eduardo, Udacity React Mentor Fall 2017
// on 06 Jan 2018
const CALL = (method) => {
  return FETCH = (url, params, debug=true) => {

      const headers = { 'Content-Type': 'application/json' }
      if(token) headers['Authorization'] = `Bearer ${token}`

      const options = {
        method,
        headers
      }

      let urlParams = method === 'GET' ? `?`+queryString.stringify(params) : ''

      if(method !== 'GET') {
        options.body = JSON.stringify(params)
      }

      return fetch(`${API_URL}${url}${urlParams}`, options)
      .then(res => {
        // response handling
      })
      .catch(error => {
        // error handling
      })
  }
}

export const GET    = CALL('GET')
export const POST   = CALL('POST')
export const PUT    = CALL('PUT')
export const DELETE = CALL('DELETE')

//Usage
const users = GET('/users')
const user = GET('/users/1')
const update = PUT(`/users/1`, {
  email: 'new_email_address'
})

import React, { Component } from 'react';
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className='row'>
      <div className='col'>
        <h1>404 Page Not Found</h1>
				<p>Sorry, there is nothing to see here.</p>
				<p><Link to="/" replace={false}>Back To Home</Link></p>
      </div>
    </div>
  )
}

export default NotFound

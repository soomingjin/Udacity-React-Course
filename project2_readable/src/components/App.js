import React, { Component } from 'react';
import '../styles/App.css'
import {
  Route,
  Link
} from 'react-router-dom';
import logo from '../logo.svg';
import Home from './Home'
import Category from './Category'
import Post from './Post'
import Edit from './Edit'

class App extends Component {
  render() {
    return (
      <div className='container'>
          <Route exact path="/" render={() => (<Home/>)}/>
          <Route path="/category" render={() => (<Category/>)}/>
          <Route path="/post" render={() => (<Post/>)}/>
          <Route path="/edit" render={() => (<Edit/>)}/>
      </div>
    )
  }
}

export default App;

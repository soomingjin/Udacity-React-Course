import React, { Component } from 'react';
import '../styles/App.css'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import logo from '../logo.svg';
import Home from './Home'
import Category from './Category'
import Post from './Post'
import Edit from './Edit'

class App extends Component {
  const postId = "1212";

  state = {
    postModalOpen: false,
    commentModalOpen: false,

  }

  openPostModal = ({ edit }) => {
    if (edit) {

    }

    this.setState(() => {
      postModalOpen: true,
    })
  }

  closePostModal = () => {
    this.setState(() => {
      postModalOpen: false,
    })
  }

  openCommentModal = () => {
    this.setState(() => {
      commentModalOpen: true,
    })

  }

  closeCommentModal = () => {
    this.setState(() => {
      commentModalOpen: false,
    })
  }




// path params :variable

  render() {
    return (
      <div className='container'>
        <ul>
          <li><Link to='/react'>React</Link></li>
          <li><Link to='/redux'>Redux</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" render={() => (<Home/>)}/>
          <Route path="/:category" render={() => (<Category/>)}/>
        </Switch>
      </div>
    )
  }
}

export default App;

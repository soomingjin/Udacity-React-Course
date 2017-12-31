import React, { Component } from 'react';
import '../styles/App.css'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import Edit from './Edit'

class App extends Component {

  state = {
    postModalOpen: false,
    commentModalOpen: false,

  }

  openPostModal = ({ edit }) => {

    this.setState(() => ({
      postModalOpen: true,
    }))
  }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false,
    }))
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true,
    }))

  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
    }))
  }



// path params :variable

  render() {
    const { categories } = this.props;
    return (
      <div className='container'>
        <ul>
          {categories.map((category) => {

            return (<li><Link to={`/${category}`}>{category}</Link></li>)

          })}
          <li><Link to='/react'>React</Link></li>
          <li><Link to='/redux'>Redux</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:category" render={() => (<Category />)}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  // console.log(Object.keys(state["category"]));
  return {
    categories: Object.keys(state["category"]),
    // categories: Object.keys(state).filter((key) => key === "category").map((key) => {
    //   return Object.keys(state[key])
    // })
  }
  return {}
}

export default connect(mapStateToProps)(App);

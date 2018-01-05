import React, { Component } from 'react';
import * as api from '../utils/api'
import '../styles/App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import { getCategories } from '../actions'

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


componentWillMount () {
  api
  .getCategories()
  .then(data =>
    this.props.dispatch(getCategories(data.categories)
  ))
}
// path params :variable

  render() {
    const { categories } = this.props;
    const url = "http://localhost:3001/posts"
    return (
      <Router>
        <div className='container'>
          <ul>
            <li><Link to="/">Home</Link></li>
            {categories.map((category) => {
              return (<li key={category} ><Link to={`/${category}`}>{category}</Link></li>)
            })}
          </ul>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:category" component={Category}/>
            <Route exact path="/:category/:post_id" component={Post}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps  = ({ categories }, ownProps) => {
  return {
    categories: Object.keys(categories).map(category => category.name),
  }
}
export default connect(mapStateToProps)(App);

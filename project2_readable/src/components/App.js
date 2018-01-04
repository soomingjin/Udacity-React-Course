import React, { Component } from 'react';
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


componentDidMount () {

}
// path params :variable

  render() {
    const { categories } = this.props;
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

const mapStateToProps  = (state, ownProps) => {
  return {
    categories: state["categories"].map((category) => (category.name))
  }
}
export default connect(mapStateToProps)(App);

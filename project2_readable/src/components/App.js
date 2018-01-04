import React, { Component } from 'react';
import '../styles/App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux'
import Home from './Home'
import Category from './Category'

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
          <Route exact path="/" component={Home}/>
          <Route path="/:category" component={Category}/>

        </div>
      </Router>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  // console.log(Object.keys(state["category"]));
  return {
    categories: state["categories"].map((category) => (category.name))
    // categories: Object.keys(state).filter((key) => key === "category").map((key) => {
    //   return Object.keys(state[key])
    // })
  }
}
export default connect(mapStateToProps)(App);

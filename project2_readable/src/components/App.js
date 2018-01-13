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
import Modal from 'react-modal'
import Home from './Home'
import Category from './Category'
import Post from './Post'
import AddEditPost from './AddEditPost'
import AddEditComment from './AddEditComment'
import { getCategories, getAllPosts, togglePostModal } from '../actions'

class App extends Component {

  state = {
    postModalOpen: false,
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

componentWillMount () {
  api
  .getCategories()
  .then(data =>
    this.props.getCategories(data.categories)
  )
  api.getPosts().then(data => this.props.getAllPosts(data))

}

  render() {
    const { categories, modalMode } = this.props;
    const { postModalOpen, commentModalOpen } = this.state;
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
          <button onClick={this.openPostModal}>Add new post</button>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:category" component={Category}/>
            <Route exact path="/:category/:post_id" component={Post}/>
          </Switch>
          <Modal
            className='modal'
              isOpen={postModalOpen}
            onRequestClose={this.closePostModal}
            contentLabel='Modal'
            ariaHideApp={false}
          >
            {postModalOpen && <AddEditPost />}
          </Modal>

        </div>
      </Router>
    )
  }
}

const mapStateToProps  = ({ categories, modalMode }, ownProps) => {
  return {
    categories: Object.keys(categories).map(category => categories[category].name),
    modalMode: modalMode,
  }
}


export default connect(mapStateToProps, { getCategories, getAllPosts, togglePostModal })(App);

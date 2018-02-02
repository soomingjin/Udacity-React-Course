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
// import Modal from 'react-modal'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
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

  openPostModal = () => {
    this.setState(() => ({
      postModalOpen: true,
    }))
  }

  togglePostModal = () => {
    this.setState((prevState) => ({
      postModalOpen: !prevState.postModalOpen,
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
        <div>
          <nav class="navbar-expand-lg navbar-dark bg-dark navbar navbar-default">
            <a class="navbar-brand" href="#">Readable</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link class="nav-link" to='/'>Home <span class="sr-only">(current)</span></Link>
                </li>

                {categories.map((category) => {
                  return (
                  <li key={category}>
                    <Link class="nav-link" to={`/${category}`}>{category}</Link>
                  </li>
                )
                })}
              </ul>
            </div>
          </nav>
          {/*
          <ul>
            <li><Link to="/">Home</Link></li>
            {categories.map((category) => {
              return (<li key={category} ><Link to={`/${category}`}>{category}</Link></li>)
            })}
          </ul>
          */}
          <div className='container'>
            <div className='row '>
              <div className='col-2'>
                <button className="btn btn-outline-primary" onClick={this.openPostModal}>Add New Post</button>
              </div>
            </div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:category" component={Category}/>
            <Route exact path="/:category/:post_id" component={Post}/>
          </Switch>
          </div>
          <Modal
            isOpen={postModalOpen}
            toggle={this.togglePostModal}
          >
            <ModalBody>
              <AddEditPost />
            </ModalBody>
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

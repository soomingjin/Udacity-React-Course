import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Post from './Post';
import FullPost from './FullPost';

class Category extends Component {
  state = {
    category: "",
  }
  componentWillMount () {
    this.setState( {category: this.props.match ? this.props.match.params.category : ""})
  }
  render(){
    const props = this.props;

    return (
      <Router>
        <div className='container'>
          {this.props.match ? (<h2>{this.props.match.params.category}</h2>) : ""}
          <Switch>
            <Route path="/" component={FullPost}/>
            <Route path="/:category/:post_id" component={Post}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Category;

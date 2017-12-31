import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Post from './Post';
import FullPost from './Post';

class Category extends Component {
  state = {
    category: "",
  }
  componentWillMount () {
    
  }
  render(){
    const props = this.props;
    return (
      <div>
        <div>{this.state.category}</div>
        <Switch>
          <Route path="/:post_id" render={() => (<Post/>)}/>
          <Route path="/" render={(<FullPost/>)}/>
        </Switch>
      </div>
    )
  }
}

export default Category;

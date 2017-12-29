import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Post from './Post';
import FullPost from './Post';

class Category extends Component {
  const props = this.props;

  render(){
    return (
      <div>
        <div>{props.match.params.category}</div>
        <Switch>
          <Route path="/:post_id" render={() => (<Post/>)}/>
          <Route path="/" render={(<FullPost/>)}/>
        </Switch>
      </div>
    )
  }
}

export default Category;

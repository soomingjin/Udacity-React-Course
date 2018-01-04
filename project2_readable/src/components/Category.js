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

  componentWillMount () {
    this.setState( {category: this.props.match ? this.props.match.params.category : ""})

  }
  render(){
    const props = this.props;
    const category = this.props.match ? this.props.match.params.category : ""
    return (
      <Router>
        <div className='container'>
          {category !== "" ? (<h2>{category}</h2>) : ""}
          <Switch>
            <Route path="/" render={() => <FullPost category={category}/>}/>
            <Route path="/:category/:post_id" component={Post}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Category;

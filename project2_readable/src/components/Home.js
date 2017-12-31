import React, { Component } from 'react';
import Category from './Category';
import Post from './Post';

class Home extends Component {
  state = {
    categories: ["react", "redux"],
  }
  componentWillMount() {

  }

  render(){
    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home;

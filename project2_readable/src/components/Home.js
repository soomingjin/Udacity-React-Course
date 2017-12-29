import React, { Component } from 'react';
import Category from './Category';
import Post from './Post';

class Home extends Component {
  const categories;

  componentWillMount() {
    categories = ["react", "redux"];
  }

  render(){
    return (
      <div>
        {categories.map((category) => (
          <Category category={category}/>
        ))}
      </div>
    )
  }
}

export default Home;

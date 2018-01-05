import React, { Component } from 'react';
import Post from './Post';
import FullPost from './FullPost';

class Category extends Component {

  componentWillMount () {
    this.setState( {category: this.props.match ? this.props.match.params.category : ""})

  }
  render(){
    const props = this.props;
    const category = this.props.match ? this.props.match.params.category : ""
    console.log(category);
    return (
      <div className='container'>
        {category !== "" ? (<h2>{category}</h2>) : ""}
        <FullPost category={category}/>
      </div>
    )
  }
}

export default Category;

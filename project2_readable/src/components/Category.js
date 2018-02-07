import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import FullPost from './FullPost';

class Category extends Component {

  componentWillMount() {
    this.setState({
      category: this.props.match
        ? this.props.match.params.category
        : ""
    })

  }
  render() {
    const category = this.props.match
      ? this.props.match.params.category
      : ""
    if (!category) {
      return (<Redirect from='*' to='/404'/>)
    }
    return (<div>
      {
        category !== ""
          ? (<h2>{category}</h2>)
          : ""
      }
      <Link to="/" replace={false}>Back</Link>
      <FullPost category={category}/>
    </div>)
  }
}

export default Category;

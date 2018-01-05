import React, { Component } from 'react';
import { connect } from 'react-redux'
import Category from './Category';
import FullPost from './FullPost';

class Home extends Component {
  componentWillMount() {

  }

  render(){
    const { categories } = this.props;
    return (
      <div>
        <h2>Home</h2>
        <FullPost/>
        {/*categories.map((category) => {
          return (<Category key={category} category={category}/>)
        })*/}
      </div>
    )
  }
}

const mapStateToProps  = ({ categories }, ownProps) => {
  return {
    categories: Object.keys(categories).map(category => category.name),
  }
}
export default connect(mapStateToProps)(Home);

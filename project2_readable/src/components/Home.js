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

const mapStateToProps  = (state, ownProps) => {
  // console.log(Object.keys(state["category"]));
  return {
    categories: Object.keys(state["category"]),
    // categories: Object.keys(state).filter((key) => key === "category").map((key) => {
    //   return Object.keys(state[key])
    // })
  }
}
export default connect(mapStateToProps)(Home);

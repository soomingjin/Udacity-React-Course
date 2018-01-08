import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import Comment from './Comment'
import { getCommentsForPost } from '../actions'

class Comments extends Component {

  componentWillMount() {
    api.getCommentsForPost(this.props.parentId).then((data) => {
      this.props.getCommentsForPost(data)
    })
  }
  render(){
    return (
      <div className='container'>
        <h2>Comments</h2>
        {this.props.data.map((data) => (<Comment key={data.id} id={data.id} />))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: Object.values(state.comments)
  }
}
export default connect(mapStateToProps, { getCommentsForPost })(Comments);

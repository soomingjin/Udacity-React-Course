import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Comment from './Comment'
import { getCommentsForPost } from '../actions'

class Comments extends Component {

  componentWillMount() {
    api.getCommentsForPost(this.props.match.params.post_id).then((data) => {
      this.props.getCommentsForPost(data)
    })
  }
  render(){
    const data = this.props.data ? this.props.data : {}
    return (
      <div className='container'>
        <h2>Comments</h2>
        {data.map((data) => (<Comment key={data.id} id={data.id} />))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: Object.values(state.comments),
  }
}

const mapDispatchToProps = dispatch => ({
  getCommentsForPost: data => dispatch(getCommentsForPost(data))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))

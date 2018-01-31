import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Comment from './Comment'
import { getCommentsForPost } from '../actions'
import { getSortedComments } from '../selectors'
import { changeCommentsSort } from '../actions'

class Comments extends Component {
  state = {
    value: 'voteScore',
  }

  onSortChange = (e) => {
    const sortMethod = e.target.value;
    this.setState(() => ({
      value: sortMethod,
    }))
    this.props.changeCommentsSort(sortMethod)
  }

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
          <div className='control-panel'>
            <label>Sort by: </label>
            <select value={this.state.value} id='sort' className='sort' onChange={this.onSortChange}>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Timestamp</option>
            </select>
          </div>
        {data.map((data) => (<Comment key={data.id} id={data.id} />))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // data: Object.values(state.comments),
    data: getSortedComments(state),
  }
}

const mapDispatchToProps = dispatch => ({
  getCommentsForPost: data => dispatch(getCommentsForPost(data)),
  changeCommentsSort: sortMethod => dispatch(changeCommentsSort(sortMethod)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))

import React, { Component } from 'react';
import uuid from 'uuid';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addComment, editComment } from '../actions'

class AddEditComment extends Component {
  state = {
    body: "",
    author: "",
    id: "",
  }

  handleSubmit = () => {
    let payload = {};
    if (this.props.currentCommentIds.includes(this.state.id)){
      payload = {
        ...this.state,
      }
      api.editComment(payload.id, payload).then(data => editComment(data.id, data))
    } else {
      payload = {
        ...this.state,
        timestamp: Date.now(),
        parentId: this.props.parentId
      }
      api.addComment(payload).then(data => addComment(data))
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  componentWillMount(){
    this.setState({
      id: uuid(),
    })
    if (this.props.data) {
      const { body, author, id } = this.props.data
      this.setState({
       body,
       author,
       id,
      })
    }
  }

  render(){
    const { body, author } = this.state;
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label for="body" sm={2}>Body</Label>
            <Col sm={10}>
              <Input name='body' placeholder='body' type='textarea' onChange={this.handleInputChange} value={body}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="author" sm={2}>Author</Label>
            <Col sm={10}>
              <Input name='author' placeholder='author' type='text' onChange={this.handleInputChange} value={author}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCommentIds: Object.keys(state.comments),
})

export default connect(mapStateToProps, { addComment, editComment })(AddEditComment);

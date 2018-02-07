import React, {Component} from 'react';
import uuid from 'uuid';
import * as api from '../utils/api'
import {connect} from 'react-redux'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {addPost, editPost} from '../actions'

class AddEditPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "react",
    id: ""
  }

  handleCategoryChange = (e) => {
    this.setState({category: e.currentTarget.value})
  }

  handleSubmit = () => {
    let payload = {};
    if (this.props.currentPostIds.includes(this.state.id)) {
      payload = {
        ...this.state
      }
      api.editPost(payload.id, payload).then(data => this.props.editPost(data.id, data))
    } else {
      payload = {
        ...this.state,
        timestamp: Date.now()
      }
      api.addPost(payload).then(data => this.props.addPost(data))
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  }

  componentWillMount() {
    this.setState({id: uuid()})

    if (this.props.data) {
      const {title, body, author, category, id} = this.props.data
      this.setState({title, body, author, category, id})
    }
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const {title, body, author, category} = this.state;
    return (<div>
      <Form>
        <FormGroup row="row">
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input name='title' placeholder='title' type='text' onChange={this.handleInputChange} value={title}/>
          </Col>
        </FormGroup>
        <FormGroup row="row">
          <Label for="author" sm={2}>Author</Label>
          <Col sm={10}>
            <Input name='author' placeholder='author' type='text' onChange={this.handleInputChange} value={author}/>
          </Col>
        </FormGroup>
        <FormGroup row="row">
          <Label for="body" sm={2}>Body</Label>
          <Col sm={10}>
            <Input name='body' placeholder='body' type='textarea' onChange={this.handleInputChange} value={body}/>
          </Col>
        </FormGroup>
        <FormGroup row="row">
          <Label for="category" sm={2}>Category</Label>
          <Col sm={10}>
            <Input name='category' type='select' onChange={this.handleInputChange} value={category}>
              <option value='react'>React</option>
              <option value='redux'>Redux</option>
              <option value='udacity'>Udacity</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row="row">
          <Col sm={{
              size: 10,
              offset: 2
            }}>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  currentPostIds: Object.keys(state.posts)
})

export default connect(mapStateToProps, {addPost, editPost})(AddEditPost);

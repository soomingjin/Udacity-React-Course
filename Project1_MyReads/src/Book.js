import React from 'react';
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    key: PropTypes.string,
    onBookChange: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    e.preventDefault();
    this.props.onBookChange(this.props.data, e.target.value);
  }

  render() {
    const data = this.props.data;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${data.imageLinks.thumbnail})`
              }}></div>
            <div className="book-shelf-changer">
              {/**
              Manipulate the value attribute on the root element to choose the selected element
              These are Controlled Components.
              In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input.
              You can pass an array into the value attribute, allowing you to select multiple options in a select tag:
              */
              }
              <select value={data.shelf} onChange={this.handleChange}>
                <option value="none" disabled="disabled">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{data.title}</div>
          <div className="book-authors">{data.author}</div>
        </div>
      </li>
    )
  }
}

export default Book

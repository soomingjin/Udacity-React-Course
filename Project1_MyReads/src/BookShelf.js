import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookShelf extends React.Component {
  titles = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want To Read",
    "read": "Read"
  }

  state = {
    // types of shelves: currentlyReading, wantToRead, read
    shelf: this.props.shelf,
    books: []
  }


  createBookDivs = (books) => {}

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        if (this.state.title === book.shelf){
          this.state.books.push(book);
        }
      })
    })
  }

  render() {
    return (<div className="bookshelf">
      <h2 className="bookshelf-title">{this.titles[this.props.shelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <li>
            <Book/>
          </li>
          <li>
            <Book/>
          </li>
        </ol>
      </div>
    </div>)
  }
}

export default BookShelf

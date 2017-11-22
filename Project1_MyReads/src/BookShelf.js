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

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      const tempBooks = [];
      books.forEach((book) => {
        if (this.state.shelf === book.shelf) {
          tempBooks.push(book);
        }
      })
      this.setState(prevState => ({books: [...prevState.books, ...tempBooks]}))
    })
  }

  render() {
    let books = this.state.books;
    // console.log(books);
    return (<div className="bookshelf">
      <h2 className="bookshelf-title">{this.titles[this.props.shelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (<Book key={book.id} data={book} shelf={this.state.shelf}/>))}
        </ol>
      </div>
    </div>)
  }
}

export default BookShelf

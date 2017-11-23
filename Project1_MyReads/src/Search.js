import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  state = {
    books: []
  }
  
  fetchBooks = (query) => {
    if (!query.trim())
      return;
    BooksAPI.search(query.trim(), 20).then((books) => {
      if (books.error)
        return;
      books.forEach((book) => {
        this.props.shownBooks.forEach((shownBook) => {
          if (shownBook.id === book.id) {
            book.shelf = shownBook.shelf;
          } else {
            book.shelf = "none";
          }
        })
      })
      this.setState({books: books});
    })
  }
  render() {
    const books = this.state.books;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.fetchBooks(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (<Book key={book.id} data={book} shelf={book.shelf} onBookChange={this.props.onBookChange}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search

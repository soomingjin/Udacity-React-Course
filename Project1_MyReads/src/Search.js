import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  static propTypes = {
    onBookChange: PropTypes.func.isRequired,
    shownBooks: PropTypes.array.isRequired
  }

  state = {
    searchedBooks: []
  }

  fetchBooks = (query) => {
    if (!query.trim())
      return;
    BooksAPI.search(query.trim(), 20).then((searchedBooks) => {
      if (searchedBooks.error)
        return;
      searchedBooks.map((searchedBook) => {
        const bookInAShelf = this.props.shownBooks.filter(b => b.id === searchedBook.id)
        if(bookInAShelf.length) {
          searchedBook.shelf = bookInAShelf[0].shelf;
        } else {
          searchedBook.shelf = "none";
        }
        return searchedBook
      })
      this.setState({searchedBooks: searchedBooks});
    })
  }
  render() {
    const books = this.state.searchedBooks;

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

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import Search from './Search'
/**
  Re-Submission for Udacity React Course Project_1 01 Dec 2017
  Done by: Soo Ming Jin
  This React app has three levels of Components
  App
  |__Search
    |__Book
  |__BookShelf
    |__Book
  The books are stored in App's state and are accessed from every other component
  One event will trigger the change to the books array, namely onChange on select
  element in the Book component that will trigger a function in App to handle the event
  Another event is onChange event on input element in Search component, it will trigger a
  function in its own component.

  The handleBookChange on App component updates the book when the value in the
  dropdown menu changes. It will update it's shelf value on the server and
  re-render the page.

  The fetchBooks function on Search component will update the books array in Search component
  to ensure the correct books are displayed on '/search' page.

  This project's learning objectives includes but not limited to, Lifting States,
  Hooking on React Lifecycle events, Managing states, passing props, error handling,
  edge cases
*/
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    })
  }

  // Lifted state two levels up
  handleBookChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    const books = this.state.books;
    return (
      <div className="app">
        <Route exact path="/" render={() => (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf onBookChange={this.handleBookChange} books={books} shelf="currentlyReading"/>
                <BookShelf onBookChange={this.handleBookChange} books={books} shelf="wantToRead"/>
                <BookShelf onBookChange={this.handleBookChange} books={books} shelf="read"/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <Search shownBooks={books} onBookChange={this.handleBookChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

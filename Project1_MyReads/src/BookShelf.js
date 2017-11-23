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
    shelf: "",
  }

  componentWillMount() {
    const shelf = this.props.shelf;
    this.setState({shelf: shelf});
  }
  render() {
    const { shelf, books } = this.props;
    // console.log(books);
    return (<div className="bookshelf">
      <h2 className="bookshelf-title">{this.titles[shelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            if (this.state.shelf === book.shelf) return <Book key={book.id} data={book} shelf={this.state.shelf} onBookChange={this.props.onBookChange}/>
          })}
        </ol>
      </div>
    </div>)
  }
}

export default BookShelf

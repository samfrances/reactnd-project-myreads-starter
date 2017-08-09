import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelfView from './BookShelfView';
import SearchView from './SearchView';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    shelfNames: ["currentlyReading", "wantToRead", "read"]
  }

  componentDidMount() {
    this.refreshShelves()
  }

  changeShelf = async (book, shelfName) => {

    const book_id = book.id

    const updated_books = this.state.myBooks.map(
      (book) =>
        book.id === book_id
          ? ({...book, shelf: shelfName})
          : ({...book})
    )
    this.setState({ myBooks: updated_books })

    return await BooksAPI.update(book, shelfName)
  }

  /* Reload shelf state from the server */
  refreshShelves = async () => {
    const myBooksRefreshed = await BooksAPI.getAll();
    this.setState({ myBooks: myBooksRefreshed })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelfView
            myBooks={this.state.myBooks}
            shelfNames={this.state.shelfNames}
            changeShelf={this.changeShelf}
            refreshShelves={this.refreshShelves}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchView
            myBooks={this.state.myBooks}
            shelfNames={this.state.shelfNames}
            changeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;

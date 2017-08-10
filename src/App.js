import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';

import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelvesView from './BookShelvesView';
import SearchView from './SearchView';



class BooksApp extends React.Component {
  state = {
    myBooks: [],
    booksToShelves: {},
    shelfNames: ["currentlyReading", "wantToRead", "read"]
  }

  componentDidMount() {
    this.refreshShelves()
  }

  changeShelf = async (book, shelfName) => {

    this.setState((prevState) => ({
      booksToShelves: {
        ...prevState.booksToShelves,
        [book.id]: shelfName
      },
      // Add the book if it is new
      myBooks: (
        !prevState.myBooks.map(book => book.id).includes(book.id)
          ? [...prevState.myBooks, book]
          : prevState.myBooks
      )
    }));

    return await BooksAPI.update(book, shelfName)
  }

  /* Reload shelf state from the server */
  refreshShelves = async () => {
    const myBooksRefreshed = await BooksAPI.getAll();
    const myBooks = myBooksRefreshed.map(book =>
      _.omit(book, 'shelf')
    )
    const booksToShelves = Object.assign(
      {}, ...myBooksRefreshed.map((book) => ({ [book.id]: book.shelf }))
    )
    this.setState({ myBooks, booksToShelves })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelvesView
            myBooks={this.state.myBooks}
            booksToShelves={this.state.booksToShelves}
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

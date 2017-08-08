import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookList from './BookList';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  async changeShelf(book, shelfName) {
    const shelves = await BooksAPI.update(book, shelfName)
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList books={this.state.books} />
        )} />
        <Route path="/search" component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp;

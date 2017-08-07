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
    const booksData = await BooksAPI.getAll();
    const books = booksData.map(
      ({ title, industryIdentifiers, authors, imageLinks, shelf }) =>
        ({
          title,
          shelf,
          id: industryIdentifiers[0].identifier,
          author: authors[0],
          coverURL: imageLinks.smallThumbnail,
        })
    )
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

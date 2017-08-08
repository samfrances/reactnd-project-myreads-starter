import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelfList from './BookShelfList';
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

  changeShelf = async (book, shelfName) => {

    const book_id = book.id

    const updated_books = this.state.books.map(
      (book) =>
        book.id === book_id
          ? ({...book, shelf: shelfName})
          : ({...book})
    )
    this.setState({ books: updated_books })

    const shelves = await BooksAPI.update(book, shelfName)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelfList
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )} />
        <Route path="/search" component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp;

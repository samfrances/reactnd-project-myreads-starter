import React from 'react';
import { Link } from 'react-router-dom';

import BookShelfList from './BookShelfList';

const BookList = ({ books }) =>
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <BookShelfList books={books} />
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>;


export default BookList;

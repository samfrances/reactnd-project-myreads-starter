import React from 'react';
import { Link } from 'react-router-dom';
import toTitleCase from 'titlecase';
import _ from 'lodash';

import BookShelf from './BookShelf';

const BookShelfList = ({ books, error=null, changeShelf=f=>f }) => {

  const shelfNames = ["currentlyReading", "wantToRead", "read"];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {error && (
        <div className="error">
          <h2>{error.message}</h2>
        </div>
      )}
      <div className="list-books-content">
        <div>
          {
            shelfNames.map((shelfName, i) =>
              <BookShelf
                key={shelfName}
                title={toTitleCase(_.startCase(shelfName))}
                books={books.filter((book) => book.shelf === shelfName)}
                shelfOptions={shelfNames}
                changeShelf={changeShelf}
              />
            )
          }
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );

}


export default BookShelfList;

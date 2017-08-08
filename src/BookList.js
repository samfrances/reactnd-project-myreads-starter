import React from 'react';
import { Link } from 'react-router-dom';

import BookShelfList from './BookShelfList';

const BookShelfList = ({ books }) => {

  let shelfNames = _.uniq(books.map(({ shelf }) => shelf))

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            shelfNames.map(shelfName =>
              <BookShelf
                key={shelfName}
                title={_.startCase(shelfName)}
                books={
                  books
                    .filter((book) => book.shelf === shelfName)
                    .map((book) => ({...book, shelfOptions: shelfNames}))
                }
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

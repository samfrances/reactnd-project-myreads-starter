import React from 'react';

import BookDetail from './BookDetail';
import { titleCase } from './utils';

const BookShelf = ({ name, books, shelfOptions, changeShelf=f=>f }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{titleCase(name)}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map(book => (
            <BookDetail
              key={book.id}
              book={book}
              shelf={name}
              shelfOptions={shelfOptions}
              changeShelf={changeShelf}
            />
          ))
        }
      </ol>
    </div>
  </div>;

export default BookShelf;
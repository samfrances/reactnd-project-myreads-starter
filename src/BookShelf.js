import React from 'react';

import BookDetail from './BookDetail';

const BookShelf = ({ title, books, shelfOptions, changeShelf=f=>f }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map((book) => (
            <BookDetail
              key={book.id}
              book={book}
              shelfOptions={shelfOptions}
              changeShelf={changeShelf}
            />
          ))
        }
      </ol>
    </div>
  </div>;

export default BookShelf;
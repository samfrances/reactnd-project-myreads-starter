import React from 'react';

import BookDetail from './BookDetail';

const BookShelf = ({ title, books }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map(({ id, imageLinks, title, authors, shelf, shelfOptions }) => (
              <BookDetail
                key={id}
                coverURL={imageLinks.thumbnail}
                title={title}
                author={authors[0]}
                shelf={shelf}
                shelfOptions={shelfOptions}
              />
          ))
        }
      </ol>
    </div>
  </div>;

export default BookShelf;
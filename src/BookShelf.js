import React from 'react';

import BookDetail from './BookDetail';

const BookShelf = ({ title, books }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map(({ id, coverURL, title, author, shelf, shelfOptions }) => (
              <BookDetail
                key={id}
                coverURL={coverURL}
                title={title}
                author={author}
                shelf={shelf}
                shelfOptions={shelfOptions}
              />
          ))
        }
      </ol>
    </div>
  </div>;

export default BookShelf;
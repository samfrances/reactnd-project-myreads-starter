import React from 'react';

import BookDetail from './BookDetail';

const BookShelf = ({ title, books }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books.map(({ id, coverURL, title, author }) => (
              <BookDetail key={id} coverURL={coverURL} title={title} author={author} />
          ))
        }
      </ol>
    </div>
  </div>;

export default BookShelf;
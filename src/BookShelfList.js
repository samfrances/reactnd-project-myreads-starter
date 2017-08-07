import React from 'react';

import BookShelf from './BookShelf';

const BookShelfList = ({ books }) => {

  // Generate list of unique shelf names
  let shelfNames = books.map(({ shelf }) => shelf)
    .reduce((shelves, shelf) => {
      if (shelves.indexOf(shelf) < 0) {
        shelves.push(shelf)
      };
      return shelves;
    }, [])

  return (
    <div className="list-books-content">
      <div>
        {
          shelfNames.map(shelfName =>
            <BookShelf
              title={shelfName}
              books={books.filter(
                (book) => book.shelf === shelfName
              )}
            />
          )
        }
      </div>
    </div>
  );

}

export default BookShelfList;
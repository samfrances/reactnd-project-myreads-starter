import React from 'react';
import _ from 'lodash';

import BookShelf from './BookShelf';

const BookShelfList = ({ books }) => {

  // Generate list of unique shelf names
  let shelfNames = _.uniq(books.map(({ shelf }) => shelf))

  return (
    <div className="list-books-content">
      <div>
        {
          shelfNames.map(shelfName =>
            <BookShelf
              key={shelfName}
              title={_.startCase(shelfName)}
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
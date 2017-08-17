import React from 'react';

import { titleCase } from './utils';

const BookDetail = ({ book, shelf = 'none', shelfOptions = [], changeShelf = f=>f }) =>
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: (
              book.imageLinks
                ? `url("${book.imageLinks.thumbnail}")`
                : null
            ),
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={e => changeShelf(book, e.target.value)}
          >
            <option value="none" disabled>Move to...</option>
            {
              shelfOptions.map(option =>
                <option key={option} value={option}>
                  {titleCase(option)}
                </option>
              )
            }
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.author}</div>
    </div>
  </li>;

export default BookDetail;

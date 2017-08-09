import React from 'react';
import _ from 'lodash';
import toTitleCase from 'titlecase';

const BookDetail = ({ book, shelfOptions=[], changeShelf=f=>f }) =>
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${book.imageLinks.thumbnail}")`
        }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(e) => changeShelf(book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            {
              shelfOptions.map((option) =>
                <option key={option} value={option}>
                  {toTitleCase(_.startCase(option))}
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

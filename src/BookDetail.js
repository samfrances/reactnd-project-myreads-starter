import React from 'react';
import _ from 'lodash';

const BookDetail = ({ title, author, coverURL, shelf, shelfOptions }) =>
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${coverURL}")`
        }}></div>
        <div className="book-shelf-changer">
          <select value={shelf}>
            <option value="none" disabled>Move to...</option>
            {
              shelfOptions.map((option) =>
                <option key={option} value={option}>
                  {_.startCase(option)}
                </option>
              )
            }
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  </li>;

export default BookDetail;

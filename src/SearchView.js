import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookDetail from './BookDetail';
import _ from 'lodash';


class SearchView extends React.Component {

  state = {
    query: "",
    search_results: []
  }

  update_query = _.debounce(
    async (value) => {
      const results = await BooksAPI.search(value || " ", 10)
      if (!results || results.error) {
        this.setState({ search_results: [] })
      } else {
        this.setState({ search_results: results })
      }
    }, 500
  )

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.update_query(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.search_results.map((result) =>
                <BookDetail
                  key={result.id}
                  book={result}
                  shelfOptions={this.props.shelfNames}
                  shelf={this.props.booksToShelves[result.id]}
                  changeShelf={this.props.changeShelf}
                />
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchView;

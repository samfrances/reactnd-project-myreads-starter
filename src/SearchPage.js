import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookDetail from './BookDetail';

class SearchPage extends React.Component {

  state = {
    query: "",
    search_results: []
  }

  update_query = async (value) => {
    this.setState({ query: value})
    if (value === "") {
      this.setState({ search_results: [] })
    } else {
      try {
        const results = await BooksAPI.search(value, 10)
        if (this.state.query === value) {
          this.setState({ search_results: results })
        }
      } catch (e) {
        this.setState({ search_results: []})
      }
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                <BookDetail key={result.id} book={result} />
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;

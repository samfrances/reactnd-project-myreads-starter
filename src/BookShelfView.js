import React from 'react';
import { Link } from 'react-router-dom';
import sleep from 'sleep-promise';

import { titleCase } from './utils';
import BookShelf from './BookShelf';

class BookShelfView extends React.Component {

  state = {
    error: null,
    notification: null
  }

  componentDidMount() {
    /* When the bookshelf view is mounted (for example, when returning from
     * the search view), check for updates from the server */
    this.props.refreshShelves()
  }

  changeShelf = async (book, shelfName) => {
    const shelves = await this.props.changeShelf(book, shelfName)
    if (shelves[shelfName] && shelves[shelfName].includes(book.id)) {
      this.setState({
        notification: `"${book.title}" moved to "${titleCase(shelfName)}"`
      })
      await sleep(3000)
    } else {
      this.setState({
        error: {
          message: `Error moving "${book.title}" to "${titleCase(shelfName)}". Reloading.`
        }
      })
      await Promise.all([
        this.props.refreshShelves(),
        sleep(3000)
      ])
    }
    this.setState({ notification: null, error: null })
  }

  render() {

    const { myBooks, shelfNames } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {this.state.error && (
          <div className="error notification">{this.state.error.message}</div>
        )}
        {this.state.notification && (
          <div className="notification">{this.state.notification}</div>
        )}
        <div className="list-books-content">
          <div>
            {
              shelfNames.map((shelfName, i) =>
                <BookShelf
                  key={shelfName}
                  title={titleCase(shelfName)}
                  books={myBooks.filter((book) => book.shelf === shelfName)}
                  shelfOptions={shelfNames}
                  changeShelf={this.changeShelf}
                />
              )
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );

  }

}

export default BookShelfView;

import React from 'react';
import { Link } from 'react-router-dom';
import sleep from 'sleep-promise';

import { titleCase } from './utils';
import BookShelf from './BookShelf';

class BookShelvesView extends React.Component {

  state = {
    error: null,
    notification: null
  }

  componentDidMount() {
    /* When the bookshelf view is mounted (for example, when returning from
     * the search view), check for updates from the server */
    this.props.refreshShelves()
  }

  notify = async (message) => {
    this.setState({
      notification: message
    });
    await sleep(3000);
    this.setState({ notification: null })
  }

  notify_error = async (message) => {
    this.setState({
        error: { message}
    })
    await Promise.all([
      this.props.refreshShelves(),
      sleep(3000)
    ])
    this.setState({ error: null })
  }

  changeShelf = async (book, shelfName) => {

    const shelves = await this.props.changeShelf(book, shelfName)

    if (shelves[shelfName] && shelves[shelfName].includes(book.id)) {
      await this.notify(`"${book.title}" moved to "${titleCase(shelfName)}"`)
    } else if (shelfName === "none") {
      await this.notify(`Removed "${book.title}" from shelves`)
    } else {
      this.notify_error(
        `Error moving "${book.title}" to "${titleCase(shelfName)}". Reloading.`
      )
    }
  }

  render() {

    const { myBooks, booksToShelves, shelfNames } = this.props;

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
                  name={shelfName}
                  books={
                    myBooks.filter(
                      book => booksToShelves[book.id] === shelfName
                    )
                  }
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

export default BookShelvesView;

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MovieCard.css';

class MovieCard extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: '',
  };

  render() {
    const { message } = this.props;
    return (
      <div className={s.cardsHolder}>
        <div className="alert alert-danger ">
          <h4>Oh, no! It is an Error!</h4>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieCard);

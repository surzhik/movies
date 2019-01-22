import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../history';
import s from './MovieCard.css';

class MovieCard extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/interactive-supports-focus */
  static propTypes = {
    movie: PropTypes.object.isRequired,
    clearMovie: PropTypes.func.isRequired,
  };

  handleMovieClick = () => {
    const { movie, clearMovie } = this.props;
    clearMovie();
    history.push(`/movie/${movie.id}`);
  };

  render() {
    const { movie } = this.props;
    return (
      <div
        className={s.movieHolder}
        onClick={this.handleMovieClick}
        role="link"
      >
        <div className="row">
          <div className="col-sm-3">
            <div className={s.posterHolder}>
              {movie.backdrop_path && (
                <img
                  src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                />
              )}

              <div className={s.voteCount}>{movie.vote_average}</div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className={s.descHolder}>
              <h3 className={s.movieTitle}>{movie.title}</h3>
              <div className={s.movieOverview}>{movie.overview}</div>
              <div className={s.propsRow}>
                <span>Release date:</span> {movie.release_date}
              </div>
              <div className={s.propsRow}>
                <span>Genres: </span>
                {movie.genres && movie.genres.length > 0 ? (
                  <ul>
                    {movie.genres.map(genre => (
                      <li key={`genre_${genre.id}`}>{genre.name}</li>
                    ))}
                  </ul>
                ) : (
                  '—'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieCard);

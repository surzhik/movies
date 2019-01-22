import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../history';
import s from './MovieItem.css';

class MovieItem extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    movie: PropTypes.object.isRequired,
  };

  handleMovieClick = () => {
    const { movie } = this.props;
    history.push(`/movie/${movie.id}`);
  };

  render() {
    const { movie } = this.props;
    return (
      <div className={s.movieHolder} onClick={this.handleMovieClick}>
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
              <div className={s.releaseDate}>
                <span>Release date:</span> {movie.release_date}
              </div>
              <div className={s.releaseDate}>
                <span>Genres: </span>
                {movie.genres && (
                  <ul>
                    {movie.genres.map(genre => (
                      <li key={`genre_${genre.id}`}>{genre.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieItem);

/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MovieItem.css';

class MovieItem extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    movie: PropTypes.object.isRequired,
  };

  formatMoney = money =>
    money
      ? money
          .toFixed(0)
          .replace(/./g, (c, i, a) =>
            i && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c,
          )
      : '0';

  render() {
    const { movie } = this.props;
    return (
      <div className={s.movieHolder}>
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
              <div className={s.propsRow}>
                <span>Status:</span> {movie.status}
              </div>
              <div className={s.propsRow}>
                <span>Runtime:</span>{' '}
                {movie.runtime ? `${movie.runtime} minutes` : '—'}
              </div>
              <div className={s.propsRow}>
                <span>Budget:</span>{' '}
                {movie.budget ? `$${this.formatMoney(movie.budget)}` : '—'}
              </div>
              <div className={s.propsRow}>
                <span>Revenue:</span>{' '}
                {movie.revenue ? `$${this.formatMoney(movie.revenue)}` : '—'}
              </div>
              {/* eslint-disable react/jsx-no-target-blank */}
              <div className={s.propsRow}>
                <span>Homepage:</span>{' '}
                {movie.homepage ? (
                  <a href={movie.homepage} target="_blank">
                    {movie.homepage}
                  </a>
                ) : (
                  '—'
                )}
              </div>
              <div className={s.propsRow}>
                <span>IMDB:</span>{' '}
                {movie.imdb_id ? (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                  >
                    https://www.imdb.com/title/{movie.imdb_id}
                  </a>
                ) : (
                  '—'
                )}
              </div>
              <div className={s.propsRow}>
                <span>Adult:</span> {movie.adult ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieItem);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getMovie, getSimilarMovies, clearMovie } from '../../actions/movie';
import Loader from '../../components/Loader';
import ErrorLoading from '../../components/ErrorLoading';
import MovieItem from '../../components/MovieItem';
import MovieCard from '../../components/MovieCard';
import history from '../../history';
import debounce from '../../debounce';
import s from './Movie.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getMovie,
        getSimilarMovies,
        clearMovie,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ movie, error, movies }) {
  return {
    loading: movie.loading,
    data: movie.data,
    error,
    searchText: movies.searchText,
    similar: movie.similar.results,
  };
}

class Movie extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    movieId: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
    similar: PropTypes.array,
  };
  static defaultProps = {
    loading: false,
    similar: undefined,
  };

  state = {
    loadingView: this.props.loading,
    movieData: this.props.data,
    appError: this.props.error,
    similarMovies: this.props.similar,
  };

  componentDidMount() {
    const { actions, movieId } = this.props;
    actions.getSimilarMovies(movieId).then(() => {
      const { error } = this.props;
      if (!error.gotError) {
        actions.getMovie(movieId);
      }
    });
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */

    const stateObject = {};

    const {
      loading,
      data,
      error,
      searchText,
      similar,
      movieId,
      actions,
    } = this.props;
    if (prevProps.loading !== loading) {
      stateObject.loadingView = loading;
    }

    if (prevProps.data !== data) {
      stateObject.movieData = data;
    }

    if (prevProps.similar !== similar) {
      stateObject.similarMovies = similar;
    }

    if (prevProps.error !== error) {
      stateObject.appError = error;
    }

    if (prevProps.searchText !== searchText) {
      this.changeSearchPage();
    }

    if (Object.keys(stateObject).length) {
      this.setState(stateObject);
    }

    if (prevProps.movieId !== movieId) {
      actions.getSimilarMovies(movieId).then(() => {
        if (!this.props.error.gotError) {
          actions.getMovie(movieId);
        }
      });
    }
  }

  changeSearchPage = debounce(() => {
    history.push('/');
  }, 1000);

  handleClearMovie = () => {
    const { actions } = this.props;
    actions.clearMovie();
  };
  render() {
    /* eslint-disable no-nested-ternary */
    const { loadingView, movieData, similarMovies, appError } = this.state;
    return (
      <div className={s.mainCol}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {loadingView && !appError.gotError && <Loader />}
              {appError.gotError ? (
                <ErrorLoading message={appError.message} />
              ) : movieData && !loadingView ? (
                <div>
                  <div className={s.movieHolder}>
                    <MovieItem movie={movieData} />
                  </div>
                  {/* TODO: Infinite scroll should be here  */}
                  {similarMovies &&
                    similarMovies.length > 0 && (
                      <div>
                        <div className={s.totalPages}>You may like this</div>
                        {similarMovies.map(movie => (
                          <MovieCard
                            movie={movie}
                            key={`movie_${movie.id}`}
                            clearMovie={this.handleClearMovie}
                          />
                        ))}
                      </div>
                    )}
                </div>
              ) : !loadingView ? (
                <h4>No Movie Found</h4>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(Movie));

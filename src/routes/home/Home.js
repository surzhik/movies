/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getGenresList } from '../../actions/genres';
import { getMoviesList, searchMovies } from '../../actions/movies';
import { clearMovie } from '../../actions/movie';
import Loader from '../../components/Loader';
import ErrorLoading from '../../components/ErrorLoading';
import MovieCard from '../../components/MovieCard';
import debounce from '../../debounce';

import s from './Home.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getGenresList,
        getMoviesList,
        searchMovies,
        clearMovie,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ movies, error, genres }) {
  return {
    genres,
    loading: movies.loading,
    data: movies.data,
    error,
    page: 1,
    searchText: movies.searchText,
  };
}

class Home extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    genres: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    searchText: PropTypes.string.isRequired,
  };
  static defaultProps = {
    loading: false,
  };
  /* eslint-disable react/sort-comp */
  /* eslint-disable no-param-reassign */
  prepareGenres = () => {
    const { genres } = this.props;
    const data = JSON.parse(JSON.stringify(this.props.data));
    if (data.results && data.results.length) {
      data.results.forEach(movie => {
        movie.genres = genres.data.filter(genre =>
          movie.genre_ids.includes(genre.id),
        );
      });
    }
    return data.results || [];
  };

  state = {
    loadingView: this.props.loading,
    moviesData: this.props.data.results ? this.prepareGenres() : [],
    appError: this.props.error,
  };

  componentDidMount() {
    const { actions, searchText } = this.props;
    actions.getGenresList().then(() => {
      const { error } = this.props;
      if (!error.gotError) {
        if (searchText) {
          actions.searchMovies(1, searchText);
        } else {
          actions.getMoviesList();
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */

    const stateObject = {};
    const { moviesData } = this.state;
    const { loading, data, error, searchText } = this.props;
    if (prevProps.loading !== loading) {
      stateObject.loadingView = loading;
    }

    if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      if (prevProps.data.page < data.page) {
        stateObject.moviesData = [...moviesData, ...this.prepareGenres()];
      } else {
        stateObject.moviesData = this.prepareGenres();
      }
    }

    if (prevProps.error !== error) {
      stateObject.appError = error;
    }
    if (prevProps.searchText !== searchText) {
      this.listOrSearch();
    }

    if (Object.keys(stateObject).length) {
      this.setState(stateObject);
    }
  }

  listOrSearch = debounce(() => {
    const { searchText, actions } = this.props;
    if (searchText) {
      actions.searchMovies(1, searchText);
    } else {
      actions.getMoviesList();
    }
    window.scrollTo(0, 0);
  }, 1000);

  loadMore = () => {
    const { loadingView } = this.state;
    const { actions, data, searchText } = this.props;

    if (data.page < data.total_pages && !loadingView) {
      if (searchText) {
        actions.searchMovies(data.page + 1, searchText);
      } else {
        actions.getMoviesList(data.page + 1);
      }
    }
    //
  };
  handleClearMovie = () => {
    const { actions } = this.props;
    actions.clearMovie();
  };

  render() {
    /* eslint-disable no-nested-ternary */
    const { loadingView, moviesData, appError } = this.state;
    const { data } = this.props;

    return (
      <div className={s.mainCol}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {loadingView && !appError.gotError && <Loader />}
              {appError.gotError ? (
                <ErrorLoading message={appError.message} />
              ) : moviesData.length > 0 ? (
                <div>
                  <div className={s.totalPages}>
                    Found {data.total_pages * 20} movies
                  </div>
                  <div className={s.cardsHolder}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={this.loadMore}
                      hasMore={data.page < data.total_pages}
                    >
                      {moviesData.map(movie => (
                        <MovieCard
                          movie={movie}
                          key={`movie_${movie.id}`}
                          clearMovie={this.handleClearMovie}
                        />
                      ))}
                    </InfiniteScroll>
                  </div>
                </div>
              ) : !loadingView ? (
                <h4>No Movies Found</h4>
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
)(withStyles(s)(Home));

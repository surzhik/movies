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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getMovie } from '../../actions/movie';
import Loader from '../../components/Loader';
import ErrorLoading from '../../components/ErrorLoading';
import MovieItem from '../../components/MovieItem';
import history from '../../history';
import debounce from '../../debounce';
import s from './Movie.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getMovie,
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
  };
  static defaultProps = {
    loading: false,
  };

  state = {
    loadingView: this.props.loading,
    movieData: this.props.data,
    appError: this.props.error,
  };

  componentDidMount() {
    const { actions, movieId } = this.props;
    actions.getMovie(movieId);
  }

  componentDidUpdate(prevProps, prevState) {
    /* eslint-disable react/no-did-update-set-state */

    const stateObject = {};

    const { loading, data, error, searchText } = this.props;
    if (prevProps.loading !== loading) {
      stateObject.loadingView = loading;
    }

    if (prevProps.data !== data) {
      stateObject.movieData = data;
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
  }

  changeSearchPage = debounce(() => {
    history.push('/');
  }, 1000);

  render() {
    /* eslint-disable no-nested-ternary */
    const { loadingView, movieData, appError } = this.state;
    const { data } = this.props;

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

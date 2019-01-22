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
import { getMoviesList } from '../../actions/movies';
import Loader from '../../components/Loader';
import ErrorLoading from '../../components/ErrorLoading';
import MovieCard from '../../components/MovieCard';
import s from './Home.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getMoviesList,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ movies }) {
  return {
    loading: movies.loading,
    data: movies.data,
    error: movies.error,
  };
}

class Home extends React.Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
  };

  state = {
    loadingView: this.props.loading,
    moviesData: this.props.data,
    gotError: this.props.error,
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getMoviesList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        loadingView: this.props.loading,
        moviesData: this.props.data,
        gotError: this.props.error,
      });
    }
  }

  render() {
    /* eslint-disable no-nested-ternary */
    const { loadingView, moviesData, gotError } = this.state;
    return (
      <div className={s.mainCol}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {loadingView ? (
                <Loader />
              ) : gotError ? (
                <ErrorLoading message="It is unable to load movies list. Please try again later." />
              ) : moviesData.total_pages ? (
                <div>
                  Page {moviesData.page} from {moviesData.total_pages}
                </div>
              ) : (
                <h4>No Movies Found</h4>
              )}
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

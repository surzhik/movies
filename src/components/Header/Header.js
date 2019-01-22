/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import history from '../../history';
import { setSearchText } from '../../actions/movies';
import s from './Header.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setSearchText,
      },
      dispatch,
    ),
  };
}

function mapStateToProps({ movies }) {
  return {
    searchText: movies.searchText,
  };
}

class Header extends React.PureComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleFilterChange = event => {
    const { actions } = this.props;
    actions.setSearchText(event.target.value);
  };

  clearText = () => {
    const { actions } = this.props;
    actions.setSearchText('');
  };

  render() {
    const { searchText } = this.props;
    return (
      <div className={s.headerHolder}>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className={s.title}>
                <Link to="/">Movies List</Link>
              </div>
            </div>
            <div className="col-sm-9">
              <div className={s.inputHolder}>
                <input
                  type="text"
                  className={s.inputFilter}
                  onChange={this.handleFilterChange}
                  placeholder="Type to find movie"
                  value={searchText}
                />
                {searchText && (
                  <button className={s.clearInput} onClick={this.clearText}>
                    ×
                  </button>
                )}
              </div>
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
)(withStyles(s)(Header));

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';

class Header extends React.PureComponent {
  state = {
    loading: true,
    filterText: '',
  };

  handleFilterChange = () => {};

  render() {
    const { loading } = this.state;
    return (
      <div className={s.headerHolder}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <div className={s.title}>Movies List</div>
            </div>
            <div className="col-sm-8 col-md-9">
              <div className={s.inputHolder}>
                <input
                  type="text"
                  className={s.inputFilter}
                  onChange={this.handleFilterChange}
                  placeholder="Type to find movie"
                  disabled={loading}
                />
                <button className={s.clearInput}>×</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);

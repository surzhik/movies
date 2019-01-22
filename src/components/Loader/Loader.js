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
import s from './Loader.css';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className={s.preloaderHolder}>
        <div className={s.preloader}>
          {[...Array(8)].map((el, index) => (
            <span
              className={`${s.line} ${s[`line-${index}`]}`}
              key={`line_${index}`}
            />
          ))}
          <div>Loading</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Loader);

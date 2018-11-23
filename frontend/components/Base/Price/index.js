import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import FontIcon from 'components/Base/FontIcon';

const Price = ({className, value, coin, size, ...props}) =>
  <div className={cx(styles.root, className, styles[`root_${size || 'default'}`])} {...props} title={`${value} ${coin.toUpperCase()}`}>
    <span className={styles.value}>{value}</span>
    <span className={styles.coin}>{coin}</span>
    <FontIcon className={styles.icon} i={coin} />
  </div>

export default Price;
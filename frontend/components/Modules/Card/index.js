import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import Icon from 'components/Base/Icon';

export const Card = ({className, children, ...props}) => (
  <div className={cx(styles.root, className)} {...props}>
    {children}
  </div>
)

export const CardHeader = ({children, icon, label, ...props}) => 
  <div className={styles.header} {...props}>
    <If condition={icon}>
      <Icon i={icon} className={styles.header__icon} />
    </If>
    <If condition={label}>
      <div className={styles.header__label}>{label}</div>
    </If>
    {children}
  </div>

export const CardLabel = ({children, icon, ...props}) =>
  <div className={styles.label}>{children}</div>
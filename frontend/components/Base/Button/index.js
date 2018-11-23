import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';

const Button = ({className, children, kind, color, reverse, ...props}) => (
  <button 
    className={cx(
      styles.root, 
      className,
      styles[`root_${kind || 'default'}`],
      styles[`root_${color || 'darkGradient'}${reverse ? '--reverse' : ''}`]
    )}
    {...props}
  >{children}</button>
)

Button.displayName = 'components/Base/Button';

export default Button;
import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import Icon from 'components/Base/Icon';
import Button from 'components/Base/Button';
import Toggle from 'components/Base/Toggle';

export const Wizard = ({className, children, src, status, title, ...props}) => (
  <div 
    className={cx(
      styles.root, 
      className,
      {[styles.root_active]: status == 'queue'}
    )}
    {...props}
  >
    <div className={styles.indicator}>
      <img src={`${gon.asset_host}/office/${src}`} className={styles.img} title={title} />
    </div>
    {children}
    <If condition={status == 'completed'}>
      <div className={styles.done}>
        <Icon className={styles.done__icon} i='done' />
      </div>
    </If>
  </div>
)

export const WizardDescription = ({children, ...props}) => <div className={styles.description} {...props} dangerouslySetInnerHTML={{ __html: children }} />; 

export const WizardButton = ({children, ...props}) => <Button className={styles.btn} {...props}>{children}</Button>;
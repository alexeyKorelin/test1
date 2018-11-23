import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import rocket from '../../../assets/images/rocket.svg';

const InvestBtn = inject('store')(observer(({className, onClick, store: {locales: {t}}, ...props}) => 
  <button onClick={onClick} className={cx(styles.root, className)}>
    <span className={styles.root__inner} />
    <span className={styles.root__inner1} />
    <span className={styles.root__inner2} />
    <span className={styles.root__inner3}>
      {t('sidebar.invest')}<br />
      <img className={styles.rocket} src={rocket}/>
    </span>
  </button>
))

InvestBtn.displayName = 'components/Modules/InvestBtn'

export default InvestBtn

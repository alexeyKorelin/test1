import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import Icon from '../../Base/Icon';

const Footer = inject('store')(observer(({className, store: {locales: {t}}, ...props}) =>
  <footer className={cx(styles.root, className)}>
    <a className={styles.exit} href={'/users/sign_out'}>
      <Icon i={'exit'} className={styles.exit__icon} noGradient />
      {t(`footer.exit`)}
    </a>
    <ul className={styles.menu}>
      <li className={styles.menu__li}>
        <a className={styles.menu__link} href={'/'}>{t(`footer.guide`)}</a>
      </li>
      <li className={styles.menu__li}>
        <a className={styles.menu__link} href={'/'}>{t(`footer.politic`)}</a>
      </li>
      <li className={styles.menu__li}>
        <a className={styles.menu__link} href={'/'}>{t(`footer.buy`)}</a>
      </li>
    </ul>
  </footer>
));

Footer.displayName = 'components/Modules/Footer';

export default Footer;

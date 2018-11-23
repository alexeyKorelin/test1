import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import home from '../../../assets/images/home.svg';
import { Link } from 'mobx-router';
import routes from 'utils/routes';

@inject('store')
@observer
class Menu extends Component {
  render () {
    const {className, store: {locales: {t}, router}} = this.props;

    return (
      <ul className={cx(styles.root, className)}>
        <li className={styles.li}>
          <Link router={router} className={cx(styles.a, router.currentView.path == "/" && styles.a_active)} view={routes.home}>
            <img className={styles.home} src={home} />
            <span className={styles.content}>
              <span className={styles.title}>{t(`sidebar.menu.home`)}</span>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <Link router={router} className={cx(styles.a, router.currentView.path == "/referals" && styles.a_active)} view={routes.referals}>
            <span className={styles.content}>
              <span className={styles.title}>{t(`sidebar.menu.referal`)}</span>
            </span>
          </Link>
        </li>
        <li className={styles.li}>
          <a className={cx(styles.a, styles.a_inactive)}>
            <span className={styles.content}>
              <span className={styles.soon}>{t(`sidebar.menu.soon`)}</span>
              <span className={styles.title}>{t(`sidebar.menu.bounty`)}</span>
            </span>
          </a>
        </li>
      </ul>
    )
  }

}

Menu.displayName = 'components/Modules/Menu';

export default Menu;

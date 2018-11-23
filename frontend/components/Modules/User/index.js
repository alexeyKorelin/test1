import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class User extends Component {
  render () {
    const { className, store: {auth: { user }, locales: { t } } } = this.props

    return (
      <div className={cx(styles.root, className)}>
        <div className={styles.username}>{user.fullname}</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.status}>{t(`statuses.${user.status}`)}</div>
      </div>
    )
  }
}

User.displayName = 'components/Modules/User'

export default User

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import styles from './index.module.sass';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import cx from 'classnames';
import Button from 'components/Base/Button';

@inject('store')
@observer

class Referals extends Component {

  render () {
    const {store: { locales: {t}, auth: {user} } } = this.props;

    return (
      <main className={cx(styles.root)}>
        <h1 className={styles.h1}>{t(`referals.title`)}</h1>
        <div className={styles.linkInfo}>
          <h2 className={styles.h2}>{ t('referals.link') }</h2>
          <input type='text' className={styles.link} value={user.refLink} readOnly />
          <CopyToClipboard text={user.refLink}>
            <Button className={styles.copy} kind='slim' color='darkGradient' reverse>{t('referals.copy')}</Button>
          </CopyToClipboard>
        </div>
        <div className={styles.referals}>
          <h2 className={styles.h2}> { t(`referals.invited`) } </h2>
          <div className={styles.table}>
            <table className={styles.table__table}>
              <thead>
                <tr>
                  <td>{t('referals.table.email')}</td>
                  <td>{t('referals.table.status')}</td>
                  <td>{t('referals.table.date')}</td>
                </tr>
              </thead>
              <tbody>
                {user.invited.map((u,i) => {
                  return (
                    <tr key={i}>
                      <td title={u.email}>{u.email}</td>
                      <td>
                        <span className={styles.status} title={u.fullStatus}>{u.fullStatus}</span>
                      </td>
                      <td>{u.fullDate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }
}

export default Referals;

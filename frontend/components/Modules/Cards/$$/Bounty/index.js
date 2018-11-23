import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Card, CardHeader, CardLabel} from 'components/Modules/Card';
import Price from 'components/Base/Price';
import Indicator from 'components/Base/Indicator';
import Toggle from 'components/Base/Toggle';

@inject('store')
@observer
class Bounty extends Component {
  state = {
    tab: 1
  }

  render () {
    const {tab} = this.state;
    const {className, store: {locales: {t}, auth: {user}}} = this.props;

    return (
      <Card className={className}>
        <CardHeader
          label={t(`cards.ico`)}
          icon='pig'
        >
          <div className={styles.actions}>
            <button onClick={() => this.toggle(1)} className={cx(styles.actions__action, {[styles.actions__action_active]: tab === 1})}>{t(`cards.common`)}</button>
            <button onClick={() => this.toggle(2)} className={cx(styles.actions__action, {[styles.actions__action_active]: tab === 2})}>{t(`cards.my`)}</button>
          </div>
        </CardHeader>
        <div className={styles.container}>
          <div className={styles.col}>
            <Toggle>
              <If condition={user.eth !== null}>
                <div className={styles.balance}>
                  <CardLabel>{t(`cards.balance`)}</CardLabel>
                  <Price
                    value={user.eth}
                    coin={'eth'}
                  />
                </div>
              </If>
            </Toggle>
            <Toggle>
              <If condition={user.mntl !== null}>
                <div className={styles.bought}>
                  <CardLabel>{t(`cards.bought`)}</CardLabel>
                  <Price
                    size='sm'
                    value={user.mntl}
                    coin={'mntl'}
                  />
                </div>
              </If>
            </Toggle>
          </div>
          <div className={styles.col}>
            <Choose>
              <When condition={tab === 1}>
                <Indicator className={styles.indicator} value={90} />
              </When>
              <Otherwise>
                <Indicator className={styles.indicator} value={30} />
              </Otherwise>
            </Choose>
          </div>
        </div>
      </Card>
    )
  }

  toggle = (tab) => this.setState({tab: tab});
}

Bounty.displayName = 'components/Modules/Cards/$$/Bounty';

export default Bounty;

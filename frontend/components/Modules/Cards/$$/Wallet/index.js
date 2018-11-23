import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Card, CardHeader, CardLabel} from 'components/Modules/Card';
import Dropdown from 'components/Base/Dropdown';
import Price from 'components/Base/Price';
import Toggle from 'components/Base/Toggle';

@inject('store')
@observer
class Wallet extends Component {
  maxCount = 44;

  state = {
    edit: false,
    value: this.props.store.auth.user.wallet,
    error: false,
    saving: false
  }

  render () {
    const {edit, value, error, saving} = this.state;
    const {className, store: {locales: {t}, auth: {user}}} = this.props;

    return (
      <Card className={className}>
        <CardHeader
          label={t(`cards.wallet.title`)}
          icon='wallet'
        >
          <Choose>
            <When condition={edit}>
              <div className={styles.actions}>
                <button className={styles.actions__action} onClick={this.cancel} disabled={saving}>{t(`cards.wallet.cancel`)}</button>
                <button className={styles.actions__action} onClick={this.save} disabled={error || saving}>{t(`cards.wallet.save`)}</button>
              </div>
            </When>
            <Otherwise>
              <div className={styles.shortCode}>{user.shortWallet}</div>
              <Dropdown className={styles.settings}>
                <button onClick={this.goEdit}>{t(`cards.wallet.edit`)}</button>
              </Dropdown>
            </Otherwise>
          </Choose>
        </CardHeader>
        <Choose>
          <When condition={edit}>
            <div className={styles.wallet}>
              <CardLabel>{t(`cards.wallet.number`)}</CardLabel>
              <div className={cx(styles.input, {[styles.input_error]: error})}>
                <input type='text' value={value} onChange={this.onChange} disabled={saving} className={styles.input__input} />
                <span className={styles.input__count}>
                  <span className={styles.input__count_current}>{value.length}</span>/{this.maxCount}
                </span>
                <Toggle>
                  <If condition={error}>
                    <div className={styles.input__error}>{t('wizards.wallet.error')}</div>
                  </If>
                </Toggle>
              </div>
            </div>
          </When>
          <Otherwise>
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
          </Otherwise>
        </Choose>
      </Card>
    )
  }

  goEdit = () => this.setState({edit: true});

  cancel = () => this.setState({edit: false, value: this.props.store.auth.user.wallet, error: false});

  onChange = (e) => {
    const value = e.target.value;

    this.setState({
      value: value,
      error: value && value.length > 0 && value.length <= this.maxCount ? false : true
    });
  }

  save = () => {
    const {user} = this.props.store.auth;

    this.setState({saving: true});

    user.updateWallet({
      user: { wallet: this.state.value }
    }).then(res => {
      user.updateBalance();
      this.setState({edit: false, saving: false});
    }).catch(res => {
      this.setState({error: true, saving: false});
    })
  }
}

Wallet.displayName = 'components/Modules/Cards/$$/Wallet';

export default Wallet;

import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import * as S from './$$';

@inject('store')
@observer
class Cards extends Component {
  componentWillMount() {
    this.props.store.auth.user.updateBalance();
  }

  render () {
    const {className} = this.props;

    return (
      <div className={cx(styles.root, className)}>
        <S.Wallet className={styles.card} />
        <S.Calculator className={styles.card} />
        {/* Bounty пока скрываем */}
        {/* <S.Bounty className={styles.card} /> */}
      </div>
    )
  }
}

Cards.displayName = 'components/Modules/Cards';

export default Cards;

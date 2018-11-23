import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import * as S from './$$';
import Sumsubstance from 'components/Sumsubstance';

@inject('store')
@observer
class Wizards extends Component {
  state = {
    verification: false
  }

  render () {
    const {verification} = this.state;
    const {className, store: {auth: {user}}} = this.props;

    return (
      <div className={cx(styles.root, className)}>
        <If condition={!['verified', 'invested'].includes(user.status)}>
          <Sumsubstance onClose={this.close} show={verification} />
        </If>
        <If condition={!verification}>
          <S.Registrate className={styles.wizard} status={'completed'} />
          <S.Verify className={styles.wizard} status={user.status} onSumSubOpen={this.open} />
          <S.Wallet className={styles.wizard} status={user.status} />
        </If>
      </div>
    )
  }

  open = () => this.setState({verification: true})

  close = () => {
    document.getElementById('idensic').innerHTML = '';
    this.setState({verification: false});
  }
}

Wizards.displayName = 'components/Modules/Wizards';

export default Wizards;

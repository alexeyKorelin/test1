import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import Wizards from 'components/Modules/Wizards';
import Cards from 'components/Modules/Cards';

@inject('store')
@observer
class Main extends Component {
  render () {
    const {className, store: {auth: {user}, locales: {t}}} = this.props;

    return (
      <main className={cx(styles.root, className)}>
        <h1 className={styles.h1}>{t(`container.cabinet`)}</h1>
        <Choose>
          <When condition={user.filled}>
            <Cards />
          </When>
          <Otherwise>
            <Wizards />
          </Otherwise>
        </Choose>
      </main>
    )
  }
}

Main.displayName = 'components/Modules/Main';

export default Main;

import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import logo from 'assets/images/logo.svg';
import {inject, observer} from 'mobx-react';
import User from 'components/Modules/User';
import Menu from 'components/Modules/Menu';
import InvestBtn from 'components/Modules/InvestBtn';
import VerifyPopup from 'components/Modules/VerifyPopup';
import { Link } from 'mobx-router';
import routes from 'utils/routes';

@inject('store')
@observer
class Sidebar extends Component {
  state = {
    verifyPopupIsOpen: false
  }

  render () {
    const {verifyPopupIsOpen} = this.state;
    const {className, store} = this.props;

    return (
      <aside className={cx(styles.root, className)}>
        <Link router={store.router} view={routes.home}>
          <img className={styles.logo} src={logo} alt={'Mental Dashboard'} />
        </Link>
        <User className={styles.user} />
        <Menu className={styles.menu} />
        <InvestBtn className={styles.investBtn} onClick={this.verifyPopupOpen} />
        <VerifyPopup isOpen={verifyPopupIsOpen} onClose={this.verifyPopupClose} />
      </aside>
    )
  }

  verifyPopupOpen = () => {
    const {store: {auth: {user}}} = this.props;

    if (user.filled) user.updateSmartContractAddress();
    this.setState({verifyPopupIsOpen: true});
  }

  verifyPopupClose = () => {
    this.setState({verifyPopupIsOpen: false});
  }
}

Sidebar.displayName = 'components/Modules/Sidebar';

export default Sidebar;

import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popup from 'components/Base/Popup';
import Button from 'components/Base/Button';
import Toggle from 'components/Base/Toggle';

@inject('store')
@observer
class  VerifyPopup extends Component {
  render () {
    const {className, isOpen, onClose, store: {locales: {t}, auth: {user}}} = this.props;
    const copyright = user.filled ? t('sidebar.welcome') : '';
    return (
      <Popup isOpen={isOpen} onClose={onClose}>
        <img className={styles.img} src={`${gon.asset_host}/office/investor.png`} title={t('sidebar.invest')} />
        <h2 className={styles.h2}>{copyright}</h2>
        <Choose>
          <When condition={user.filled}>
            <Toggle>
              <If condition={user.smart_contract_address}>
                <p className={styles.description}>{user.smart_contract_address}</p>
                <CopyToClipboard text={user.smart_contract_address}>
                  <Button className={styles.copy} kind='slim' color='white' reverse>{t('sidebar.copy')}</Button>
                </CopyToClipboard>
              </If>
            </Toggle>
          </When>
          <Otherwise>
            <p className={styles.description}>{t('sidebar.verify_please')}</p>
          </Otherwise>
        </Choose>
      </Popup>
    )
  }
}

VerifyPopup.displayName = 'components/Modules/VerifyPopup';

export default VerifyPopup;

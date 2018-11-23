import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Wizard, WizardDescription, WizardButton} from 'components/Modules/Wizard';
import Toggle from 'components/Base/Toggle';

@inject('store')
@observer
class Wallet extends Component {
  _root = React.createRef();

  state = {
    input: false,
    value: '',
    error: false,
    saving: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render () {
    const {className, status, store: {locales: {t}}} = this.props;
    const {input, value, error, saving} = this.state;

    return (
      <div ref={this._root} className={className}>
        <Wizard
          src={'wallet.png'}
          title={t('wizards.wallet.title')}
          status={(status === 'verified') && 'queue'}
        >
          <Choose>
            <When condition={status === 'verified'}>
              <Choose>
                <When condition={input}>
                  <div
                    className={cx(
                      styles.input,
                      {[styles.input_error]: error}
                    )}
                  >
                    <Toggle>
                      <If condition={error}>
                        <div className={styles.input__error}>{t('wizards.wallet.error')}</div>
                      </If>
                    </Toggle>
                    <input type='text' onChange={this.onChange} value={value} className={styles.input__input} placeholder={t('wizards.wallet.placeholder')} />
                  </div>
                  <Toggle>
                    <If condition={value && !error}>
                      <WizardButton onClick={this.save} disabled={saving}>{t('wizards.wallet.save')}</WizardButton>
                    </If>
                  </Toggle>
                </When>
                <Otherwise>
                  <WizardDescription>{t('wizards.wallet.description')}</WizardDescription>
                  <WizardButton onClick={this.startInput}>{t('wizards.wallet.title')}</WizardButton>
                </Otherwise>
              </Choose>
            </When>
            <Otherwise>
              <WizardDescription>{t('wizards.wallet.description')}</WizardDescription>
            </Otherwise>
          </Choose>
        </Wizard>
      </div>
    )
  }

  onChange = (e) => {
    const value = e.target.value;

    this.setState({
      value: value,
      error: value && value.length > 0 && value.length <= 44 ? false : true
    });
  }

  startInput = () => this.setState({input: true});

  handleClickOutside = (e) => {
    const {input, value} = this.state;

    if (input && value === '') {
      const rootNode = this._root.current;

      if (!rootNode.contains(e.target)) this.setState({input: false, error: false});
    }
  }

  save = () => {
    this.setState({saving: true});

    this.props.store.auth.user.updateWallet({
      user: { wallet: this.state.value }
    }).then(res => {
      this.setState({saving: false});
    }).catch(res => {
      this.setState({error: true, saving: false});
    })
  }
}

Wallet.displayName = 'components/Modules/Wizards/$$/Wallet';

export default Wallet;

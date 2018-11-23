import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Wizard, WizardDescription, WizardButton} from 'components/Modules/Wizard';
import Toggle from 'components/Base/Toggle';
import TelegramPassport from 'components/TelegramPassport';

@inject('store')
@observer
class Verify extends Component {
  state = {
    loading: false
  }

  openSumSubstance = () => {
    const { store: { auth: { user }, locales: { locale }}, onSumSubOpen } = this.props;
    const lang = locale == 'ru-RU' ? 'ru' : locale

    this.setState({loading: true});

    user.getAccessToken().then(res => {
      const settings = {
        accessToken: res.token,
        applicantId: gon.applicant_id,
        lang: lang,
        uiConf: {
          customLogoUrl: 'https://cdn.mentalmarket.io/assets/dark-logo.svg'
        }
      }

      onSumSubOpen();
      window.idensic.init('#idensic', settings);

      this.setState({loading: false});
    }).catch(res => {
      // ...
      this.setState({loading: false});
    })
  }

  handleApplicantSubmitted = (e) => {
    if (!e.data.method) {
      return
    }
    if (e.data.method == 'idCheck.onApplicantSubmitted') {
      this.props.store.auth.user.changeStatusToPending()
    }
  }

  componentDidMount() {
    // window.Telegram.Passport.createAuthButton('telegram_passport_auth', window.telegramSettings)
    window.addEventListener('message', this.handleApplicantSubmitted)
  }

  render () {
    const {loading} = this.state;
    const { className, status, store: {locales: { t } } } = this.props;

    return (
      <Wizard
        className={className}
        src={'verify.png'}
        title={t('wizards.verify.title')}
        status={status === 'verified' ? 'completed' : 'queue'}
      >
        <WizardDescription>{t('wizards.verify.description')}</WizardDescription>
        <Toggle>
          <If condition={status !== 'verified' && status !== 'invested'}>
            {/* <TelegramPassport /> */}
            <WizardButton onClick={this.openSumSubstance} disabled={loading}>{t('wizards.verify.title')}</WizardButton>
          </If>
        </Toggle>
      </Wizard>
    )
  }
}

Verify.displayName = 'components/Modules/Wizards/$$/Verify';

export default Verify;

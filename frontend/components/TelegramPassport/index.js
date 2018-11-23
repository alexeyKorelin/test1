import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import telegram_passport from './telegram-passport'

@observer
class TelegramPassport extends Component {
  isBrowser = typeof window !== "undefined" && window !== null;

  addSettings = () => {
    const settings = {
      bot_id:       gon.bot_id,
      scope:        {data: ['phone_number', 'email'], v: 1},
      public_key:   gon.public_key,
      // TODO refactoring this without use gon
      nonce:        gon.access_token,
      callback_url: 'https://invest.mentalmarket.io/telegram_notify?'
    }
    if (this.isBrowser) {
      window.telegramSettings = settings
    }
  }

  componentDidMount() {
    this.addSettings();
  }

  render() {
    return (
      <div id="telegram_passport_auth"></div>
    )
  }
}

export default TelegramPassport;

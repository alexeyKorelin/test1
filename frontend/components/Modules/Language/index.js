import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.sass'
import cx from 'classnames';
import Icon from 'components/Base/Icon'

@inject('store')
@observer
class Language extends Component {

  render() {
    const oldIconParams = {
      height: 22,
      width: 22,
    }
    const { store: {locales}, className, whiteIcon } = this.props;
    const { t, locale } = locales;

    return (
      <div className={styles.root}>
        <div className={cx({[styles.selected]: locale === 'en'})}>
          <Icon i={`flag-en`} width={20} onClick={this.changeLanguage('en')} />
        </div>
        <div className={cx({[styles.selected]: locale === 'ru-RU'}, styles.ru)}>
          <Icon i={`flag-ru-RU`} width={20} onClick={this.changeLanguage('ru-RU')} />
        </div>
      </div>
    )
  }

  changeLanguage = (lang) => () => {
    this.props.store.locales.changeLanguage(lang)
  }
}

export default Language

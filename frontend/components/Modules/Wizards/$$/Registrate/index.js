import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Wizard, WizardDescription} from 'components/Modules/Wizard';

const Registrate = inject('store')(observer(({className, status, store: {locales: {t}}}) =>
  <Wizard
    className={className}
    src={'registrated.png'}
    status={status}
  >
    <WizardDescription>{t('wizards.registrate.description')}</WizardDescription>
  </Wizard>
))

Registrate.displayName = 'components/Modules/Wizards/$$/Registrate';

export default Registrate;

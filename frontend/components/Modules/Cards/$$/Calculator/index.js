import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import {inject, observer} from 'mobx-react';
import {Card, CardHeader} from 'components/Modules/Card';
import Price from 'components/Base/Price';
import Button from 'components/Base/Button';
import Select from 'components/Base/Select';
import Toggle from 'components/Base/Toggle';

@inject('store')
@observer
class Calculator extends Component {
  state = {
    value: 1,
    converted: 20000
  }

  render () {
    const {value, converted} = this.state;
    const {className, store: {locales: {t}}} = this.props;

    return (
      <Card className={className}>
        <CardHeader
          label={t(`cards.calculator.label`)}
          icon='calculator'
        ></CardHeader>
        <div className={styles.converter}>
          <div className={styles.input}>
            <input type='number' value={value} min='0' className={styles.input__input} onChange={this.onChange} />
            <div className={styles.input__line} />
          </div>
          <Select className={styles.select} options={[{label: 'eth', icon: 'eth', value: 'eth'}]} value={'eth'} />
        </div>
        <Toggle>
          <If condition={converted}>
            <Price
              title={converted + ' MNTL'}
              className={styles.price}
              value={converted}
              coin={'mntl'}
            />
          </If>
        </Toggle>
      </Card>
    )
  }

  onChange = (e) => this.setState({value: e.target.value, converted: this.calculation(e.target.value)});

  calculation = (value) => {
    if (value < 0) return null;

    let bonus = 0;

    if (value >= 90) {
      bonus = 20;
    } else if (value >= 60) {
      bonus = 15;
    } else if (value >= 30) {
      bonus = 10;
    } else if (value >= 15) {
      bonus = 5;
    }

    return Math.floor(20000 * value * (1 + bonus / 100));
  }
}

Calculator.displayName = 'components/Modules/Cards/$$/Calculator';

export default Calculator;

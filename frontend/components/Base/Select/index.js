import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import Toggle from 'components/Base/Toggle';
import FontIcon from 'components/Base/FontIcon';
import Icon from 'components/Base/Icon';

class Select extends Component {
  _root = React.createRef();

  state = {
    isOpen: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {isOpen} = this.state;
    const {className, options, value} = this.props;
    const current = options.find(option => option.value === value);
    
    return (
      <div ref={this._root} className={cx(styles.root, className, {[styles.root_open]: isOpen})}>
        <button className={cx(styles.toggler, styles.option)} disabled={options.length < 2} onClick={this.toggle}>
          <span className={styles.label}>{current.label}</span>
          <If condition={current.icon}>
            <FontIcon className={cx(styles.icon, {[styles.icon_dash]: current.icon == 'dash'})} i={current.icon} />
          </If>
          <If condition={options.length > 1}>
            <Icon className={styles.caret} i='caret' />
          </If>
        </button>
        <If condition={options.length > 1}>
          <Toggle>
            <If condition={isOpen}>
              <ul className={styles.dropdown}>
                <For each='option' of={options.filter(option => option.value !== value)}>
                  <li key={option.value} onClick={() => this.changeValue(option.value)} className={cx(styles.li, styles.option)}>
                    <span className={styles.label}>{option.label}</span>
                    <If condition={option.icon}>
                      <FontIcon className={cx(styles.icon, {[styles.icon_dash]: option.icon == 'dash'})} i={option.icon} />
                    </If>
                  </li>
                </For>
              </ul>
            </If>
          </Toggle>
        </If>
      </div>
    )
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  collapse = () => this.setState({isOpen: false});

  changeValue = (value) => {
    this.setState({isOpen: false, value: value}); 
  }

  handleClickOutside = (e) => {
    const rootNode = this._root.current;
    
    if (rootNode && !rootNode.contains(e.target)) {
      this.collapse();
    }
  } 
}

export default Select;

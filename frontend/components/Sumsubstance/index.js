import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import FontIcon from 'components/Base/FontIcon';

class Sumsubstance extends Component {
  componentDidMount() {
    this.addScript();
  }

  render() {
    const {show, onClose} = this.props;

    return (
      <div className={cx(styles.root, {[styles.root_active]: show})}>
        <button className={styles.close} onClick={onClose}>
          <FontIcon className={styles.close__icon} i={'close'} />
        </button>
        <div className={styles.idensic} id='idensic' />
      </div>
    )
  }

  addScript = () => {
    let el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = 'https://test-api.sumsub.com/idensic/static/idensic.js';
    let x = document.getElementById('idensic');
    x.parentNode.insertBefore(el, x);
    this.scriptIsAdded = true;
  }    
}

export default Sumsubstance;
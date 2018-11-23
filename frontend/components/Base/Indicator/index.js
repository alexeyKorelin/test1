import React from 'react';
import cx from 'classnames';
import styles from './index.module.sass';

const Indicator = ({className, value, ...props}) => {
  const r = 50;
  const l = Math.PI*(r*2);

  return (
    <div className={cx(styles.root, className)} {...props}>
      <svg className={styles.circle} width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle 
          r={r} 
          cx='60' 
          cy='60'
          stroke='#E5D8FF'
          opacity='0.268'
          strokeWidth='3.5424'
          strokeDashoffset='0'
        />
        <circle 
          r={r} 
          cx='60' 
          cy='60'
          stroke='url(#paint0_linear)'
          strokeWidth='5'
          strokeLinecap='round'
          strokeDashoffset={l - value / 100 * l}
          strokeDasharray={l}
        /> 
        <defs>
          <linearGradient id='paint0_linear' x1='67.966' y1='121.944' x2='67.966' y2='40.111' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#8D00FF' />
            <stop offset='1' stopColor='#F37DCB' />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.value}>{value} %</div>
    </div>
  )
}

export default Indicator;
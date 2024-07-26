import React from 'react';
import styles from './Submit.module.css';

export default function Submit({ btnName, btnState }) {
  return (
    <div>
      <button
        className={styles[btnState] + ' ' + styles['submitBtn']}
        type='submit'
      >
        {btnName}
      </button>
    </div>
  );
}

import React from 'react';
import styles from './Submit.module.css';

export default function Submit({ btnName, className }) {
  return (
    <>
      <button
        className={`${styles[className]} ${styles['submitBtn']}`}
        type='submit'
      >
        {btnName}
      </button>
    </>
  );
}

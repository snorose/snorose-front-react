import React from 'react';
import { useRouteError } from 'react-router-dom';
import { ERRORS } from '../../constants';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  const error = useRouteError();

  const CURRENT_ERROR_DATA = ERRORS.filter(
    (ERROR) => ERROR.status === error.status
  )[0];
  const imagePath = require(`../../assets/images/error${error.status}.png`);

  return (
    <main className={styles.errorPage}>
      <img src={imagePath} alt={`${error.status} error`} />
      <p className={styles.title}>{CURRENT_ERROR_DATA.messages[0]}</p>
      {CURRENT_ERROR_DATA.messages.length > 1 && (
        <p className={styles.text}>{CURRENT_ERROR_DATA.messages[1]}</p>
      )}
    </main>
  );
}

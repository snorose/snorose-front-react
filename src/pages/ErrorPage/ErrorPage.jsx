import React from 'react';
import { useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <main className={styles.errorPage}>
      <p className={styles.title}>Oops!</p>
      <p className={styles.description}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={styles.errorStatus}>{error.status}</p>
      <p>
        <i className={styles.errorMessage}>
          {error.statusText || error.message}
        </i>
      </p>
    </main>
  );
}

import { Link } from 'react-router-dom';

import { Icon } from '@/components/Icon/index.js';

import styles from './WriteButton.module.css';

export default function WriteButton({ to }) {
  return (
    <Link to={to}>
      <button className={styles.button}>
        <Icon id='pencil' width='30' height='30' />
      </button>
    </Link>
  );
}
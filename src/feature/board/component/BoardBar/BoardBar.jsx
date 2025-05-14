import { Link } from 'react-router-dom';

import styles from './BoardBar.module.css';

export default function BoardBar({ data }) {
  const isBesookt = data.id === 20;

  return (
    <Link to={`/board/${data.textId}`} className={styles.container}>
      <img
        className={styles.image}
        src={data.image}
        alt={data.textId}
        style={{
          height: isBesookt ? '100%' : 'none',
        }}
      />
      <div className={styles.textBox}>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.description}>{data.desc}</p>
      </div>
    </Link>
  );
}

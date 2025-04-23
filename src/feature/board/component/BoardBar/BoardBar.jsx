import { Link } from 'react-router-dom';

import styles from './BoardBar.module.css';

export default function BoardBar({ data }) {
  const isOfficial = [60, 61, 62].includes(data.id);

  return (
    <Link to={`/board/${data.textId}`} className={styles.container}>
      <img
        className={styles.image}
        src={data.image}
        alt={data.textId}
        style={{
          height: isOfficial ? 'none' : '100%',
          bottom: isOfficial ? '0.8rem' : '-0.2rem',
        }}
      />
      <div className={styles.textBox}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.desc}</p>
      </div>
    </Link>
  );
}

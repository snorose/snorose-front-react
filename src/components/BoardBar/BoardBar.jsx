import { Link } from 'react-router-dom';

import styles from './BoardBar.module.css';

export default function BoardBar({ data }) {
  return (
    <Link to={`/board/${data.textId}`}>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <div className={styles.textBox}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.description}>{data.desc}</div>
        </div>
      </div>
    </Link>
  );
}

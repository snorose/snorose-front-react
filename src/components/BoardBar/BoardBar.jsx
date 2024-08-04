import { Link } from 'react-router-dom';
import styles from './BoardBar.module.css';

export default function BoardBar({ data }) {
  return (
    <Link to={`${data.to}`} className={styles.board_list_bar}>
      <svg
        className={styles.board_bar_background}
        style={{ backgroundImage: `url("${data.image}")` }}
      ></svg>
      <div className={styles.board_bar_text}>
        <div className={styles.board_bar_title}>{data.title}</div>
        <div className={styles.board_bar_description}>{data.desc}</div>
      </div>
    </Link>
  );
}

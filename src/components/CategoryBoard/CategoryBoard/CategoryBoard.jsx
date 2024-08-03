import { Link } from 'react-router-dom';
import {
  CategoryBoardItem,
  CategoryBoardItemDetail,
} from '../../CategoryBoard';
import styles from './CategoryBoard.module.css';

function CategoryBoardMain({ title, to, children }) {
  return (
    <article className={styles.board}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link to={to} className={styles.more}>
          더보기
        </Link>
      </div>
      <ul className={styles.list}>{children}</ul>
    </article>
  );
}

const CategoryBoard = Object.assign(CategoryBoardMain, {
  Item: CategoryBoardItem,
  DetailItem: CategoryBoardItemDetail,
});

export default CategoryBoard;

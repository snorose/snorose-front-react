import { BoardCard, ListHeader } from '@/components';
import { BOARD_MENUS } from '@/constants';

import styles from './HomeCommunity.module.css';

const BOARDS = BOARD_MENUS.filter((board) => [21, 22, 23].includes(board.id));

export default function HomeCommunity({ className }) {
  return (
    <div className={`${styles.layout} ${className}`}>
      <ListHeader to='/board' title='커뮤니티' />
      <div className={styles.list}>
        {BOARDS.map((board) => (
          <BoardCard
            key={board.id}
            to={board.to}
            name={board.title}
            desc={board.desc}
            backgroundImage={board.image}
          />
        ))}
      </div>
    </div>
  );
}

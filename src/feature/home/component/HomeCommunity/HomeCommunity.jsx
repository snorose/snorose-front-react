import { BOARD_MENUS } from '@/shared/constant';

import { HomeBoardCard } from '@/feature/home/component';

import styles from './HomeCommunity.module.css';

const BOARDS = BOARD_MENUS.filter((board) => [21, 22, 23].includes(board.id));

export default function HomeCommunity({ className }) {
  return (
    <div className={`${styles.list} ${className}`}>
      {BOARDS.map((board) => (
        <HomeBoardCard
          key={board.id}
          to={board.to}
          name={board.title}
          desc={board.desc}
          backgroundImage={board.image}
        />
      ))}
    </div>
  );
}

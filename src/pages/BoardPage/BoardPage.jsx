import { useNavigate } from 'react-router-dom';

import { Header } from '@/shared/component';
import { BoardBar, Icon, Search } from '@/components';
import { BOARD_MENUS } from '@/constants';

import styles from './BoardPage.module.css';

export default function BoardPage() {
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.target.value.trim() === '') {
      return;
    }

    navigate(`/board/all/search`);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.paddingContainer}>
        <div className={styles.searchbarBox}>
          <Search placeholder='전체 게시판 내 검색' onKeyDown={handleKeyDown} />
        </div>
        <div className={styles.boardBox}>
          <div className={styles.boardTitle}>커뮤니티</div>
          <div className={styles.boardListBox}>
            {BOARD_MENUS.filter((board) =>
              [20, 21, 22, 23].includes(board.id)
            ).map((board, index) => (
              <BoardBar key={board.id} data={board} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.moreBoardBox}>
        <Icon className={styles.iconLogo} id='cloud' width={31} height={19} />
        <p>스노로즈에서 더 다양한 게시판을 준비하고 있어요</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BoardBar, Header, Icon, Sidebar, Search } from '@/components';

import { BOARD_MENUS } from '@/constants';

import styles from './BoardPage.module.css';

export default function BoardPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      event.preventDefault();
      navigate(`/board/all/search?query=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding_container}>
        <div className={styles.searchbar_box}>
          <Search
            placeholder='전체 게시판 내 검색'
            keyword={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            setKeyword={setKeyword}
            handleKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.board_box}>
          <div className={styles.board_title}>커뮤니티</div>
          <div className={styles.board_list_box}>
            {BOARD_MENUS.filter((board) =>
              [20, 21, 22, 23].includes(board.id)
            ).map((board, index) => (
              <BoardBar key={index} data={board} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.more_board_box}>
        <Icon className={styles.iconLogo} id='cloud' width={31} height={19} />
        <p>스노로즈에서 더 다양한 게시판을 준비하고 있어요</p>
      </div>
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </div>
  );
}

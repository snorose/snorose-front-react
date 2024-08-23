import styles from './BoardPage.module.css';
import {
  BoardBar,
  Header,
  Icon,
  Sidebar,
  Sponser,
  Search,
} from '@/components/';
import { BOARD_MENUS } from '@/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  // const handleSearch = (query) => {
  //   navigate(`/search/post/0?keyword=${encodeURIComponent(query)}`);
  // };

  const handleSearch = () => {
    navigate('/search/post');
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding_container}>
        <div className={styles.searchbar_box}>
          <Search placeholder='전체 게시판 내 검색' onSearch={handleSearch} />
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
        <div className={styles.icon_logo}>
          <Icon id='cloud' />
        </div>
        <p>스노로즈에서 더 다양한 게시판을 준비하고 있어요</p>
      </div>
      <div className={styles.padding_container}>
        <div className={styles.sponser}>
          <Sponser />
        </div>
      </div>
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </div>
  );
}

import styles from './BoardPage.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import Sponser from '../../components/Sponser/Sponser.jsx';
import { BOARDMENUS } from '../../constants/boardmenus.js';
import { Link } from 'react-router-dom';

const BoardBar = ({ data }) => {
  return (
    <Link to={`/board/${data.id}`} className={styles.board_list_bar}>
      <div className={styles.board_bar_icon}>
        <Icon id={data.id} />
      </div>
      <div className={styles.board_bar_title}>{data.title}</div>
      <div className={styles.board_bar_description}>{data.desc}</div>
    </Link>
  );
};

export default function BoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.side_menu_btn}>
          <Icon id='hamburger' />
        </div>
      </div>
      <div className={styles.sponser}>
      <Sponser />
      </div>
      <div className={styles.searchbar_box}>
        <div className={styles.searchbar}>
          <input type='text' placeholder='전체 게시판 검색' />
          <div>
            <Icon id='search' />
          </div>
        </div>
      </div>
      <div className={styles.board_box}>
        <div className={styles.board_title}>커뮤니티</div>
        <div className={styles.board_list_box}>
          {BOARDMENUS.map((board, index) => (
            <BoardBar key={index} data={board} />
          ))}
        </div>
      </div>
      <div className={styles.more_board_box}>
        스노로즈에서 더 다양한 게시판을 준비하고 있어요
      </div>
    </div>
  );
}

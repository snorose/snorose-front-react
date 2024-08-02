import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './BoardListPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import BackAppBar from '../../../components/BackAppBar/BackAppBar.jsx';
import PostBar from '../../../components/PostBar/PostBar.jsx';
import Sponser from '../../../components/Sponser/Sponser.jsx';
import POST_LIST from '../../../constants/postListDummy.js';
import PTR from '../../../components/PTR/PTR.jsx';
import { POST_CATEGORIES } from '../../../constants/postCategories.js';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  const boardMap = {
    'first-snow': '첫눈온방',
    'large-snow': '함박눈방',
    'permanent-snow': '만년설방',
    besookt: '베숙트',
  };
  const currentBoard = boardMap[currentPath] || '';

  const [selectedCategoryId, setSelectedCategoryId] = useState(currentPath);
  const getCurrentCategoryColor = (id, pointColor, defaultColor) =>
    id === selectedCategoryId ? pointColor : defaultColor;
  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard} hasMenu hasSearch />
      <div className={styles.top}>
        <div className={styles.notification_bar}>
          <Icon id='notification-red' width={11} height={13} />
          <p>[필독] 공지사항</p>
        </div>
        <div className={styles.keyword_box}>
          {POST_CATEGORIES &&
            POST_CATEGORIES.map(({ id, label }) => (
              <div
                key={id}
                className={styles.keyword}
                style={{
                  backgroundColor: getCurrentCategoryColor(
                    id,
                    '#00368E',
                    '#EAF5FD'
                  ),
                  color: getCurrentCategoryColor(id, '#FFFFFF', '#00368E'),
                }}
                onClick={() => handleCategoryClick(id)} // 클릭 이벤트 핸들러 추가
              >
                <p>{label}</p>
              </div>
            ))}
        </div>
      </div>
      <PTR>
        <div className={styles.content}>
          {POST_LIST.map((post, index) => (
            <PostBar key={index} data={post} />
          ))}
        </div>
      </PTR>
      <div className={styles.pencil_icon}>
        <Icon id='pencil' width={65} height={65} />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}

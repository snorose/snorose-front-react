import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './BoardListPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import PostBar from '../../../components/PostBar/PostBar.jsx';
import Sponser from '../../../components/Sponser/Sponser.jsx';
import POST_LIST from '../../../constants/postListDummy.js';
import PTR from '../../../components/PTR/PTR.jsx';
import { POST_CATEGORIES } from '../../../constants/postCategories.js';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  let currentBoard = '';

  if (currentPath === 'first-snow') {
    currentBoard = '첫눈온방';
  } else if (currentPath === 'large-snow') {
    currentBoard = '함박눈방';
  } else if (currentPath === 'permanent-snow') {
    currentBoard = '만년설방';
  } else if (currentPath === 'besookt') {
    currentBoard = '베숙트';
  }

  const [selectedCategoryId, setSelectedCategoryId] = useState(currentPath);

  const getCurrentCategoryColor = (id, pointColor, defaultColor) =>
    id === selectedCategoryId ? pointColor : defaultColor;

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.side_menu_btn}>
            <Icon id='hamburger' />
          </div>
          <h1>{currentBoard}</h1>
        </div>
        <div className={styles.notification_bar}>
          <div className={styles.notification_icon}>
            <Icon id='notification-red' />
          </div>
          <p>필독 공지사항</p>
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
                    '#BFD7EC'
                  ),
                  color: getCurrentCategoryColor(id, '#FFFFFF', '#5F86BF'),
                  border: getCurrentCategoryColor(id, '#00368E', '#5F86BF'),
                }}
                onClick={() => handleCategoryClick(id)} // 클릭 이벤트 핸들러 추가
              >
                {label}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.pencil_icon}>
          <Icon id='pencil' />
        </div>
        <PTR>
          {POST_LIST.map((post, index) => (
            <PostBar key={index} data={post} />
          ))}
        </PTR>
      </div>
      <div className={styles.refresh_icon}>
        <Icon id='refresh' />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}

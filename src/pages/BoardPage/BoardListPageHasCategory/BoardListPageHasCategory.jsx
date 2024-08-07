import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BoardListPageHasCategory.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import BackAppBar from '../../../components/AppBar/BackAppBar/BackAppBar.jsx';
import PostBar from '../../../components/PostBar/PostBar.jsx';
import Sponser from '../../../components/Sponser/Sponser.jsx';
import { POST_LIST } from '../../../dummy/data/postList.js';
import PTR from '../../../components/PTR/PTR.jsx';
import { POST_CATEGORIES } from '../../../constants/postCategories.js';

export default function BoardListPageHasCategory() {
  const navigate = useNavigate();
  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  const boardMap = {
    'first-snow': '첫눈온방',
    'large-snow': '함박눈방',
    'permanent-snow': '만년설방',
    besookt: '베숙트',
  };

  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  const currentBoard = boardMap[currentPath] || '';

  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredPosts = selectedCategory
    ? POST_LIST.filter((post) => post.category === selectedCategory)
    : POST_LIST;

  const getCategoryStyles = (id) => {
    const isSelected = id === selectedCategory;
    return {
      backgroundColor: isSelected ? '#00368E' : '#EAF5FD',
      color: isSelected ? '#FFFFFF' : '#00368E',
    };
  };

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard} hasMenu hasSearch />
      <div className={styles.top}>
        <div
          className={styles.notification_bar}
          onClick={handleNavClick('/alert')}
        >
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독] 공지사항</p>
        </div>
        <div className={styles.keyword_box}>
          {POST_CATEGORIES.map(({ id, label }) => (
            <div
              key={id}
              className={styles.keyword}
              style={getCategoryStyles(id)}
              onClick={() => handleCategoryClick(id)}
            >
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <PTR>
        <div className={styles.content}>
          {POST_CATEGORIES &&
            filteredPosts.map((post) => (
              <PostBar key={post.postId} data={post} />
            ))}
        </div>
      </PTR>
      <div className={styles.pencil_icon}>
        <Icon
          id='pencil-circle'
          width={105}
          height={105}
          onClick={handleNavClick('/post-write')}
        />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}

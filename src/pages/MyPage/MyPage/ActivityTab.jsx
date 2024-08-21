import React from 'react';
import Icon from '../../../components/Icon/Icon';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';

const ActivityTab = () => {
  return (
    <>
      <div className={styles.infoWrapper}>
        {[
          {
            label: '내 글 모아보기',
            link: 'my-post',
          },
          {
            label: '댓글 단 글 모아보기',
            link: 'comment',
          },
          {
            label: '다운 받은 시험 후기 모아보기',
            link: 'download-exam-review',
          },
          {
            label: '스크랩한 시험 후기 모아보기',
            link: 'scrap-exam-review',
          },
          {
            label: '스크랩 모아보기',
            link: 'scrap',
          },
        ].map((item, index) => (
          <div className={styles.itemList}>
            <Link to={item.link} key={index}>
              <div className={styles.item}>
                <span>{item.label}</span>
                <Icon id='angle-right' />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityTab;

import React from 'react';
import styles from './ActivityPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import { BackAppBar } from '../../../components/AppBar';

export default function MyPostPage() {
  return (
    <main className={styles.activityPage}>
      <header>
        <BackAppBar stroke='#000' />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>내가 쓴 글</h1>
        </div>

        <article className={styles.contentListContainer}>
          <section className={styles.contentBox}>
            <div className={styles.iconAuthorDateWrapper}>
              <Icon id='cloud' />
              <span className={styles.authorDate}>
                엄동설한 · 4분 전 (수정됨)
              </span>
            </div>
            <div className={styles.content}>
              <h2 className={styles.contentTitle}>글제목</h2>
              <p className={styles.contentDesc}>설명</p>
            </div>
            <div className={styles.boardCommentLikeWrapper}>
              <div className={styles.boardName}>함박눈방</div>
              <div className={styles.commentLikeWrapper}>
                <Icon id='comment' />
                <span>1</span>
                <Icon id='like' />
                <span>2</span>
              </div>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}

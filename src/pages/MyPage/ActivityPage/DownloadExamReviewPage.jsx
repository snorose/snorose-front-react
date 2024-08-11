import React from 'react';
import styles from './ActivityPage.module.css';
import Icon from '../../../components/Icon/Icon';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';
import { Sponser } from '../../../components/Sponser';

const downloadExamReview = [
  {
    userDisplay: '눈송슈',
    createdAt: '2024-08-07T12:00:00Z',
    title: '한국경제사/김두한/001',
    content: '23-겨울계절/기말',
    likeCount: 0,
    commentCount: 2,
  },
  {
    userDisplay: '작은만두',
    createdAt: '2024-07-06T06:28:00Z',
    title: '세법/윤서준/001',
    content: '22-1/기말',
    likeCount: 6,
    commentCount: 16,
  },
];

export default function DownloadExamReviewPage() {
  return (
    <main className={styles.activityPage}>
      <header>
        <BackAppBar stroke='#000' />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>다운받은 시험후기</h1>
        </div>

        <article className={styles.contentListContainer}>
          {downloadExamReview.length > 0 ? (
            downloadExamReview.map((post, index) => (
              <PostBar key={index} data={post} />
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 다운받은 후기가 없어요
              </p>
              <div className={styles.imageWrapper}>
                <Icon id='no-review-star' className={styles.image} />
              </div>
            </div>
          )}
        </article>
      </section>

      <div className={styles.sponsor}>
        <Sponser className={styles.sponsorImage} />
      </div>
    </main>
  );
}

import React from 'react';
import styles from './ActivityPage.module.css';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';

const postsData = [
  {
    userDisplay: '엄동설한',
    createdAt: '2024-08-07T12:00:00Z',
    notice: true,
    title: '까치네랑 숙대삼밥',
    content: '메뉴 열몇 종류잖아\n어케 그걸 다 먹는거야..???\n벌써 끝난 걸어?',
    likeCount: 0,
    liked: true,
    commentCount: 15,
  },
  {
    userDisplay: '샌내깅',
    createdAt: '2024-08-07T10:00:00Z',
    notice: true,
    title: '내 인생 최대 업적',
    content: '숙대밥\n응원 코라가 멋지 보여주마',
    likeCount: 27,
    liked: false,
    commentCount: 22,
  },
  {
    userDisplay: '히히디',
    createdAt: '2024-08-06T06:28:00Z',
    notice: false,
    title: '스벅 혼잡말남',
    content:
      '한두 번 본 게 아닌데\n사람들이 항상 숙대에서 계속 오시는데\n행사에는 일상적이 아무튼 비하에 쓰개면서 댓글도 허가(알려 당연히)\n행복하는 건 줄 알았어...',
    likeCount: 22,
    liked: true,
    commentCount: 16,
  },
];

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
          {postsData.map((post, index) => (
            <PostBar key={index} data={post} />
          ))}
        </article>
      </section>
    </main>
  );
}

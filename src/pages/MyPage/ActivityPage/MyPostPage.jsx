import React from 'react';
import styles from './ActivityPage.module.css';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';
import { Sponser } from '../../../components/Sponser';

const postsData = [
  {
    userDisplay: '내아이디',
    createdAt: '2024-08-07T12:00:00Z',
    title: '까치네랑 숙대삼밥',
    content: '메뉴 열몇 종류잖아\n어케 그걸 다 먹는거야..???\n벌써 끝난 걸어?',
    board: '함박눈방',
    likeCount: 0,
    commentCount: 15,
  },
  {
    userDisplay: '내아이디',
    createdAt: '2024-08-07T10:00:00Z',
    title: '내 인생 최대 업적',
    content: '숙대밥\n응원 코라가 멋지 보여주마',
    board: '첫눈온방',
    likeCount: 27,
    commentCount: 22,
  },
  {
    userDisplay: '내아이디',
    createdAt: '2024-08-06T06:28:00Z',
    title: '스벅 혼잡말남',
    content:
      '한두 번 본 게 아닌데\n사람들이 항상 숙대에서 계속 오시는데\n행사에는 일상적이 아무튼 비하에 쓰개면서 댓글도 허가(알려 당연히)\n행복하는 건 줄 알았어...',
    board: '첫눈온방',
    likeCount: 22,
    commentCount: 16,
  },
  {
    userDisplay: '내아이디',
    createdAt: '2024-08-01T06:28:00Z',
    title: '스벅 혼잡말남',
    content:
      '한두 번 본 게 아닌데\n사람들이 항상 숙대에서 계속 오시는데\n행사에는 일상적이 아무튼 비하에 쓰개면서 댓글도 허가(알려 당연히)\n행복하는 건 줄 알았어...',
    board: '첫눈온방',
    likeCount: 22,
    commentCount: 16,
  },
  {
    userDisplay: '내아이디',
    createdAt: '2024-07-06T06:28:00Z',
    title: '스벅 혼잡말남',
    content:
      '한두 번 본 게 아닌데\n사람들이 항상 숙대에서 계속 오시는데\n행사에는 일상적이 아무튼 비하에 쓰개면서 댓글도 허가(알려 당연히)\n행복하는 건 줄 알았어...',
    board: '첫눈온방',
    likeCount: 22,
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

      <div className={styles.sponsor}>
        <Sponser className={styles.sponsorImage} />
      </div>
    </main>
  );
}

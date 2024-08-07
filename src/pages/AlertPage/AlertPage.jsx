import React from 'react';
import styles from './AlertPage.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import { MenuIcon } from '../../components/MenuIcon';

const alertData = [
  {
    icon: 'star-circle',
    title: '내 글이 베송트에 추가되었습니다',
    description: `‘스노르즈 포인트를 모으는 5가지 방법’ 글이 베송트에 추가되었습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    icon: 'point-circle',
    title: '베송트 포인트가 적립되었습니다',
    description: `좋아요 10개를 받아 50포인트가 적립되었습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    icon: 'comment-circle',
    title: '스노르즈 포인트를 모으는 5가지 방법',
    description: `함박눈님 게시글에 댓글이 달렸습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    icon: 'comment-circle',
    title: '스노르즈 포인트를 모으는 5가지 방법',
    description: `내가 단 댓글에 답글이 달렸습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    icon: 'triangle-exclamation-circle',
    title: '신고 포상 포인트가 적립되었습니다',
    description: `시험 후기 게시글 신고가 완료되어 20포인트가 적립되었습니다.`,
    isRead: true,
    isWarning: false,
  },
  {
    icon: 'snow-circle',
    title: '족보 거래 목격시 즉시 신고해주세요',
    description: `최근 기밀사항을 알아 폭보 거래 제보가 증가하고 있습니다.
족보 거래를 목격하시면 즉시 신고하고 100포인트를 적립하세요.`,
    isRead: true,
    isWarning: true,
  },
  {
    icon: 'snow-circle',
    title: '시험후기 오픈 일정 알림',
    description: `시험후기 게시판 오픈일정 안내입니다. (24.12.20 - 25.01.15)
자세한 내용은 공지사항을 확인하세요.`,
    isRead: true,
    isWarning: false,
  },
];

export default function AlertPage() {
  return (
    <main className={styles.alertPage}>
      <header className={styles.menu}>
        <MenuIcon stroke='#00368E' />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>알림</h1>
          <button className={styles.readAllButton}>모두 읽기</button>
        </div>

        <article className={styles.alertListContainer}>
          {alertData.map((item, index) => (
            <section className={styles.alertBox}>
              <div className={styles.alertIconContentWrapper}>
                <Icon id={item.icon} fill='none' />
                <div className={styles.alertContent}>
                  <h2 className={styles.alertTitle}>{item.title}</h2>
                  {item.description && (
                    <p className={styles.alertDesc}>{item.description}</p>
                  )}
                </div>
              </div>
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}

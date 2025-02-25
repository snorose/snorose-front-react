import { useState } from 'react';

import { Icon } from '@/shared/component';
import { MenuIcon } from '@/components/MenuIcon';

import styles from './AlertPage.module.css';

const initialAlertData = [
  {
    type: 'addedToBoard',
    title: '내 글이 베숙트에 추가되었습니다',
    description: `‘스노르즈 포인트를 모으는 5가지 방법’ 글이 베송트에 추가되었습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    type: 'pointEarned',
    title: '베숙트 포인트가 적립되었습니다',
    description: `좋아요 10개를 받아 50포인트가 적립되었습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    type: 'commentReply',
    title: '스노르즈 포인트를 모으는 5가지 방법',
    description: `내가 단 댓글에 답글이 달렸습니다.`,
    isRead: false,
    isWarning: false,
  },
  {
    type: 'reportReward',
    title: '신고 포상 포인트가 적립되었습니다',
    description: `시험 후기 게시글 신고가 완료되어 20포인트가 적립되었습니다.`,
    isRead: true,
    isWarning: false,
  },
  {
    type: 'announcement',
    title: '족보 거래 목격시 즉시 신고해주세요',
    description: `최근 기밀사항을 알아 폭보 거래 제보가 증가하고 있습니다.
족보 거래를 목격하시면 즉시 신고하고 100포인트를 적립하세요.`,
    isRead: false,
    isWarning: true,
  },
  {
    type: 'announcement',
    title: '족보 거래 목격시 즉시 신고해주세요',
    description: `최근 기밀사항을 알아 폭보 거래 제보가 증가하고 있습니다.
족보 거래를 목격하시면 즉시 신고하고 100포인트를 적립하세요.`,
    isRead: true,
    isWarning: true,
  },
  {
    type: 'announcement',
    title: '시험후기 오픈 일정 알림',
    description: `시험후기 게시판 오픈일정 안내입니다. (24.12.20 - 25.01.15)
자세한 내용은 공지사항을 확인하세요.`,
    isRead: true,
    isWarning: false,
  },
];

const getIconId = (type, isRead) => {
  switch (type) {
    case 'addedToBoard':
      return 'star-circle';
    case 'pointEarned':
      return 'point-circle';
    case 'commentReply':
      return 'comment-circle';
    case 'reportReward':
      return 'triangle-exclamation-circle';
    case 'announcement':
      return isRead ? 'snow-circle-blue' : 'snow-circle-pink';
    default:
      return 'default-icon';
  }
};

export default function AlertPage() {
  const [alerts, setAlerts] = useState(initialAlertData);

  const markAllAsRead = () => {
    const updatedAlerts = alerts.map((alert) => ({
      ...alert,
      isRead: true,
    }));
    setAlerts(updatedAlerts);
  };

  return (
    <main className={styles.alertPage}>
      <header className={styles.menu}>
        <MenuIcon stroke='#00368E' />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>알림</h1>
          <button className={styles.readAllButton} onClick={markAllAsRead}>
            모두 읽기
          </button>
        </div>

        <article className={styles.alertListContainer}>
          {alerts.map((item, index) => (
            <section
              key={index}
              className={`${styles.alertBox} ${
                !item.isRead
                  ? item.isWarning
                    ? styles.unreadWarning
                    : styles.unread
                  : ''
              }`}
            >
              <div className={styles.alertIconContentWrapper}>
                <Icon
                  id={getIconId(item.type, item.isRead)}
                  width={32}
                  height={32}
                  fill='none'
                />
                <div className={styles.alertContent}>
                  <h2
                    className={`${styles.alertTitle} ${
                      !item.isRead
                        ? item.isWarning
                          ? styles.unreadWarningTitle
                          : styles.unreadTitle
                        : ''
                    }`}
                  >
                    {item.title}
                  </h2>
                  {item.description && (
                    <p
                      className={`${styles.alertDesc} ${
                        !item.isRead
                          ? item.isWarning
                            ? styles.unreadWarningDesc
                            : styles.unreadDesc
                          : ''
                      }`}
                    >
                      {item.description}
                    </p>
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

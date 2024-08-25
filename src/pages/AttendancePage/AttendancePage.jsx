import { Calendar } from '@/components/Calendar';
import { Icon } from '@/components/Icon';

import styles from './AttendancePage.module.css';
import { BackAppBar } from '@/components/AppBar/index.js';

export default function AttendancePage() {
  return (
    <main>
      <div className={styles.top}>
        <BackAppBar isDark />
        <h2 className={styles.title}>{`매일 출석체크하고 \n 포인트 모아요`}</h2>
        <div className={styles.calendar}>
          <Calendar />
        </div>
        <button className={styles.attendanceButton}>
          출석하고 포인트 받기
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={styles.label}>첫 출석체크</span>
            <p className={styles.description}>
              첫 출석을 완료하고 포인트를 받아요
            </p>
          </div>
          <Icon id='point-circle' width='32' height='32' />
        </div>
        <div className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={styles.label}>알림 설정</span>
            <p className={styles.description}>
              매일 출석체크 알림을 보내드릴게요
            </p>
          </div>
          <Icon id='point-circle' width='32' height='32' />
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { updatePoint } from '@/apis';

import { useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { Calendar } from '@/components/Calendar';
import { Icon } from '@/components/Icon';

import {
  ATTENDANCE_MESSAGE,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  TOAST,
} from '@/constants';
import { USER } from '@/dummy/data';

import styles from './AttendancePage.module.css';

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [attendanceHistoryByMonth, setAttendanceHistoryByMonth] = useState([]);
  const { title, content } =
    attendanceHistoryByMonth?.length > 0
      ? ATTENDANCE_MESSAGE.CONSECUTIVE
      : ATTENDANCE_MESSAGE.FIRST;

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar isDark />
        <h2 className={styles.title}>{`매일 출석체크하고 \n 포인트 모아요`}</h2>
        <div className={styles.calendar}>
          <Calendar callback={setAttendanceHistoryByMonth} />
        </div>
        <button
          className={styles.attendanceButton}
          onClick={() => {
            updatePoint({
              userId: USER.userId, // userId 교체 필요함
              category: POINT_CATEGORY_ENUM.ATTENDANCE,
              source: POINT_SOURCE_ENUM.ATTENDANCE,
            })
              .then(({ status }) => {
                if (status === 200) {
                  const today = new Date();
                  queryClient.invalidateQueries([
                    'monthlyAttendanceHistory',
                    today.getFullYear(),
                    today.getMonth() + 1,
                  ]);
                  toast(TOAST.ATTENDANCE.attendance);
                }
              })
              .catch(({ response }) => {
                toast(response.data.message);
              });
          }}
        >
          출석하고 포인트 받기
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={styles.label}>{title}</span>
            <p className={styles.description}>{content}</p>
          </div>
          <Icon id='point-circle' width='32' height='32' />
        </div>
        {/* <div className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={styles.label}>알림 설정</span>
            <p className={styles.description}>
              매일 출석체크 알림을 보내드릴게요
            </p>
          </div>
          <Icon id='point-circle' width='32' height='32' />
        </div> */}
      </div>
    </main>
  );
}

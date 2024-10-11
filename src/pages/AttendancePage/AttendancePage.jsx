import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { updatePoint } from '@/apis';

import { useAuth, useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { Calendar } from '@/components/Calendar';
import { FetchLoadingOverlay } from '@/components/Loading';
import { Icon } from '@/components/Icon';

import {
  ATTENDANCE_MESSAGE,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  QUERY_KEY,
  TOAST,
} from '@/constants';

import styles from './AttendancePage.module.css';

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const { toast } = useToast();
  const [attendanceHistoryByMonth, setAttendanceHistoryByMonth] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState();
  const { title, content } =
    attendanceHistoryByMonth?.length > 0
      ? ATTENDANCE_MESSAGE.CONSECUTIVE
      : ATTENDANCE_MESSAGE.FIRST;

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar isDark backgroundColor={'transparent'} notFixed />
        <h2 className={styles.title}>{`매일 출석체크하고 \n 포인트 모아요`}</h2>
        <div className={styles.calendar}>
          <Calendar callback={setAttendanceHistoryByMonth} />
        </div>
        <button
          className={styles.attendanceButton}
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            setLoading(true);
            updatePoint({
              userId: userInfo.userId,
              category: POINT_CATEGORY_ENUM.ATTENDANCE,
              source: POINT_SOURCE_ENUM.ATTENDANCE,
            })
              .then(({ status }) => {
                if (status === 200) {
                  const today = new Date();
                  queryClient.invalidateQueries([
                    QUERY_KEY.attendance,
                    today.getFullYear(),
                    today.getMonth() + 1,
                  ]);
                  toast(TOAST.ATTENDANCE.attendance);
                }
              })
              .catch(({ response }) => {
                toast(response.data.message);
              })
              .finally(() => {
                setDisabled(false);
                setLoading(false);
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
          <Icon id='point-circle' width={32} height={32} />
        </div>
        {/* <div className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={styles.label}>알림 설정</span>
            <p className={styles.description}>
              매일 출석체크 알림을 보내드릴게요
            </p>
          </div>
          <Icon id='point-circle' width={32} height={32} />
        </div> */}
      </div>
      {loading && <FetchLoadingOverlay />}
    </main>
  );
}

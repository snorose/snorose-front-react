import { useQueryClient } from '@tanstack/react-query';

import { updatePoint } from '@/apis';

import { useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { Calendar } from '@/components/Calendar';
import { Icon } from '@/components/Icon';

import { POINT_CATEGORY_ENUM, POINT_SOURCE_ENUM, TOAST } from '@/constants';
import { USER } from '@/dummy/data';

import styles from './AttendancePage.module.css';

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar isDark />
        <h2 className={styles.title}>{`매일 출석체크하고 \n 포인트 모아요`}</h2>
        <div className={styles.calendar}>
          <Calendar />
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
                  toast(TOAST.ATTENDANCE_SUCCESS);
                }
              })
              .catch(({ response }) => {
                const { status } = response;

                if (status === 403) {
                  toast(TOAST.ATTENDANCE_ONLY_ONCE_ERROR);
                } else {
                  toast(TOAST.ATTENDANCE_FAIL);
                }
              });
          }}
        >
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

import { Link } from 'react-router-dom';

import { Icon } from '@/components';
import { ROLE_NAME } from '@/constants';

import styles from './MyInfo.module.css';

export default function MyInfo({ userInfo }) {
  return (
    <div className={styles.myInfo}>
      <div className={styles.name}>{userInfo?.nickname}</div>
      <div className={styles.studentIdMemberType}>
        <div className={styles.studentId}>
          {userInfo?.studentNumber.slice(0, 2)}학번
        </div>
        <Icon id='middle-dot' width={5} height={5} />
        <div className={styles.memberType}>
          {ROLE_NAME[userInfo?.userRoleId]}
        </div>
      </div>
      <Link to='view-point-list'>
        <div className={styles.pointWrapper}>
          <div className={styles.point}>
            <Icon id='point-circle' width={32} height={32} />
            <span>{userInfo?.balance.toLocaleString()}</span>
          </div>
          <div className={styles.pointList}>
            포인트 내역 보기
            <Icon id='angle-right' width={16} height={16} fill='#00368e' />
          </div>
        </div>
      </Link>
    </div>
  );
}

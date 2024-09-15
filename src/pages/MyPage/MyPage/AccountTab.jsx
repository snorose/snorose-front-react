import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks';

import styles from './MyPage.module.css';

const USER_INFO_ITEM_LABEL = Object.freeze({
  loginId: '아이디',
  userName: '이름',
  email: '이메일',
  studentNumber: '학번',
  major: '전공',
  birthday: '생년월일',
});

const AccountTab = () => {
  const { userInfo, status } = useAuth();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || userInfo === undefined) {
    return null;
  }

  const userInfoValue = {
    ...userInfo,
    birthday: `${userInfo.birthday.slice(0, 4)}.${userInfo.birthday.slice(5, 7)}.${userInfo.birthday.slice(8, 10)}`,
  };

  const userInfoList = Object.entries(USER_INFO_ITEM_LABEL).map(
    ([key, label]) => ({
      label,
      value: userInfoValue[key],
    })
  );

  return (
    <div>
      <div className={styles.infoWrapper}>
        {userInfoList.map(({ label, value }) => (
          <div className={styles.info} key={label}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <Link to='edit-info'>
          <div className={styles.editButton}>내 정보 수정</div>
        </Link>
        <Link to='password'>
          <div className={styles.passwordButton}>비밀번호 변경</div>
        </Link>
      </div>
    </div>
  );
};

export default AccountTab;

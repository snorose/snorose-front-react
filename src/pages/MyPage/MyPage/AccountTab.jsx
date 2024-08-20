import { useMemo } from 'react';
import styles from './MyPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

const AccountTab = () => {
  const navigate = useNavigate();
  const { userInfo, status } = useAuth();

  const userInfoList = useMemo(() => {
    if (userInfo === null) {
      return [];
    }

    const { loginId, email, studentNumber, major, birthday } = userInfo;

    return [
      {
        label: '아이디',
        value: loginId,
      },
      {
        label: '이메일',
        value: email,
      },
      {
        label: '학번',
        value: studentNumber,
      },
      {
        label: '전공',
        value: major,
      },
      {
        label: '생년월일',
        value: birthday.replaceAll('-', '.'),
      },
    ];
  }, [userInfo]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    navigate('/login');

    return null;
  }

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

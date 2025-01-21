import defaultProfile from '@/assets/images/defaultProfile.svg';

import styles from './CircleProfile.module.css';

export default function CircleProfile({ userInfo }) {
  return (
    <div className={styles.profileImage}>
      <img
        // src={userInfo?.userProfile ?? defaultProfile}
        src={defaultProfile}
        alt={`${userInfo?.userName} 프로필`}
      />
    </div>
  );
}

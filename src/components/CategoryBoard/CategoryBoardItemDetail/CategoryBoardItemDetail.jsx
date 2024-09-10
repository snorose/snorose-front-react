<<<<<<< Updated upstream
import { ROLE } from '../../../constants';
import { USER } from '../../../dummy/data';
import PROFILE from '../../dummy/images/profile.png';
=======
import { useAuth } from '@/hooks';

import { ROLE, USER_STATUS } from '@/components/constants';

import PROFILE from '@/dummy/images/profile.png';

>>>>>>> Stashed changes
import styles from './CategoryBoardItemDetail.module.css';

export default function CategoryBoardItemDetail({
  profile,
  nickname,
  title,
  overview,
  boardName,
  timeAgo,
  image,
}) {
  if (!USER?.isLogin) {
    return <li className={styles.item}>로그인 후 이용 가능합니다.</li>;
  }

  if (USER?.role === ROLE.preUser) {
    return <li className={styles.item}>등업 후 이용 가능합니다.</li>;
  }

  const imgSrc = image ? require(`../../dummy/images/${image}`) : '';

  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <div className={styles.profileWrapper}>
          <img className={styles.profile} src={PROFILE} alt='profile' />
          <p className={styles.nickname}>{nickname}</p>
        </div>
        <span className={styles.timeAgo}>{timeAgo}</span>
      </div>
      <div className={styles.middle}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.overview}>{overview}</p>
        </div>
        {image && <img src={imgSrc} alt='preview' />}
      </div>
      <span className={styles.boardName}>{boardName}</span>
    </li>
  );
}

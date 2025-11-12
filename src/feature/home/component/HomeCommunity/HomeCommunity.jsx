import { BOARDS } from '@/shared/constant';

import { HomeBoardCard } from '@/feature/home/component';

import styles from './HomeCommunity.module.css';

import { useAuth } from '@/shared/hook';
import { USER_STATUS } from '@/shared/constant';
import { ACCESS_MESSAGES } from '@/feature/home/constant';

const order = [21, 22, 23, 14];

const MAIN_BOARDS = BOARDS.filter((board) => order.includes(board.id)).sort(
  (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
);

export default function HomeCommunity() {
  const { status } = useAuth();
  const isLogin = status === USER_STATUS.isLogin;
  return (
    <div className={styles.commuintyContainer}>
      <div className={`${styles.list}`}>
        {MAIN_BOARDS.map((board) => (
          <HomeBoardCard
            key={board.id}
            path={board.path}
            name={board.name}
            mainImage={board.mainImage}
          />
        ))}
      </div>
      {isLogin ? (
        ''
      ) : (
        <p className={styles.notLogin}>{ACCESS_MESSAGES.NEED_LOGIN}</p>
      )}
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';

import { getBest3 } from '@/apis';

import { useAuth } from '@/hooks';

import { ListHeader, MainPageListItem } from '@/components';
import { QUERY_KEY, ROLE } from '@/constants';

import styles from './HomeBesookt.module.css';

const BESOOKT_ROLES = [ROLE.user, ROLE.admin, ROLE.official];
const DEFAULT_BESOOKTS = Array.from({ length: 3 }, (_, i) => ({ postId: i }));

export default function HomeBesookt({ className }) {
  const { userInfo } = useAuth();

  const { data: besookt3 } = useQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: getBest3,
    staleTime: 1000 * 60 * 5,
    enabled: BESOOKT_ROLES.includes(userInfo?.userRoleId),
    suspense: true,
  });

  const besookts = BESOOKT_ROLES.includes(userInfo?.userRoleId)
    ? besookt3
    : DEFAULT_BESOOKTS;

  return (
    <div className={`${styles.layout} ${className}`}>
      <ListHeader to='/board/besookt' title='베숙트' />
      <div className={styles.list}>
        {besookts.map(
          ({
            boardId,
            postId,
            userDisplay,
            title,
            content,
            boardName,
            createdAt,
          }) => (
            <MainPageListItem
              key={postId}
              postId={postId}
              displayName={userDisplay}
              title={title}
              overview={content}
              boardId={boardId}
              boardName={boardName}
              createdAt={createdAt}
              roles={BESOOKT_ROLES}
            />
          )
        )}
      </div>
    </div>
  );
}

import { ListHeader, MainPageListItem } from '@/components';
import { ROLE } from '@/constants';

import styles from './HomeBesookt.module.css';

const BESOOKT_ROLES = [ROLE.user, ROLE.admin, ROLE.official];

export default function HomeBesookt({ besookts, className }) {
  return (
    <>
      {besookts.length > 0 && (
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
      )}
    </>
  );
}

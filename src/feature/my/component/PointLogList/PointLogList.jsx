import { getPointLogs } from '@/apis';

import { useSuspensePagination } from '@/shared/hook';
import { FetchLoading } from '@/shared/component';
import { flatPaginationCache } from '@/shared/lib';
import { QUERY_KEY } from '@/shared/constant';

import { PointLog } from '@/feature/my/component';

import styles from './PointLogList.module.css';

export default function PointLogList() {
  const { data, ref, isFetching } = useSuspensePagination({
    queryKey: [QUERY_KEY.pointHistory],
    queryFn: ({ pageParam }) => getPointLogs({ page: pageParam }),
  });

  const pointList = flatPaginationCache(data);

  return (
    <ul className={styles.pointListContainer}>
      {pointList.map((log, index) => (
        <PointLog
          key={log.id}
          ref={index === pointList.length - 1 ? ref : undefined}
          log={log}
        />
      ))}
      {isFetching && <FetchLoading />}
    </ul>
  );
}

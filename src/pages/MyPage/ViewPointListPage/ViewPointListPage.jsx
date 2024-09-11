import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { format } from 'date-fns';

import { getPointList } from '@/apis';

import { useAuth } from '@/hooks';

import { BackAppBar, Icon } from '@/components';

import { POINT_CATEGORY_KOREAN_ENUM } from '@/constants';

import styles from './ViewPointListPage.module.css';

export default function ViewPointListPage() {
  const { userInfo, status } = useAuth({
    isRequiredAuth: true,
  });
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getPointList'],
      queryFn: ({ pageParam }) => getPointList({ page: pageParam }),
      // 서버 API 수정 후 1 > 0으로 값 수정 필요
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage?.hasNext) {
          return null;
        }

        if (lastPage?.length === 0) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  const pointList = useMemo(() => {
    return data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'loading' || isPending) {
    return <div>loading...</div>;
  }

  if (status === 'unauthenticated' || isError) {
    return null;
  }

  return (
    <main className={styles.viewPointListPage}>
      <header>
        <BackAppBar stroke='#000' />
      </header>

      <div className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>보유 포인트</h1>
          <div className={styles.totalPointWrapper}>
            <Icon id='point-circle' />
            <span className={styles.totalPoint}>
              {userInfo.balance.toLocaleString()}
            </span>
          </div>
        </div>

        {pointList.length > 0 ? (
          <ul className={styles.pointListContainer}>
            {pointList.map(
              ({ id, difference, category, createdAt, reviewTitle }, index) => (
                <li
                  key={id}
                  className={styles.pointBox}
                  ref={pointList.length - 2 === index ? ref : undefined}
                >
                  <div className={styles.pointIconContentWrapper}>
                    <Icon id={difference > 0 ? 'heart-plus' : 'heart-minus'} />
                    <div className={styles.pointContent}>
                      <h2
                        className={`${styles.pointTitle} ${difference < 0 ? styles.negative : ''}`}
                      >
                        {POINT_CATEGORY_KOREAN_ENUM[category]}
                      </h2>
                      {reviewTitle && (
                        <span className={styles.pointDesc}>{reviewTitle}</span>
                      )}
                      <span className={styles.pointDate}>
                        {format(new Date(createdAt), 'yyyy.MM.dd HH:mm:ss')}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`${styles.chargePoint} ${difference < 0 ? styles.negative : ''}`}
                  >
                    {`${difference > 0 ? '+' : ''}${difference.toLocaleString()}`}
                  </span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>적립된 포인트 내역이 없습니다.</p>
        )}
      </div>
    </main>
  );
}

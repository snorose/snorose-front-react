import { format } from 'date-fns';

import { getPointList } from '@/apis';

import { useAuth, usePagination } from '@/hooks';

import { BackAppBar, FetchLoading, Icon } from '@/components';

import { POINT_CATEGORY_KOREAN_ENUM, QUERY_KEY } from '@/constants';

import styles from './ViewPointListPage.module.css';

export default function ViewPointListPage() {
  const { userInfo } = useAuth({
    isRequiredAuth: true,
  });

  const { data, ref, isLoading, isError } = usePagination({
    queryKey: [QUERY_KEY.pointHistory],
    queryFn: ({ pageParam }) => getPointList({ page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const pointList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

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
                  ref={pointList.length - 1 === index ? ref : undefined}
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

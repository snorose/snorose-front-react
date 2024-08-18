import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { AppBar } from '../../../components/AppBar/index.js';
import { Loading } from '../../../components/Loading/index.js';
import { PostBar } from '../../../components/PostBar/index.js';
import { PTR } from '../../../components/PTR/index.js';
import { Search } from '../../../components/Search/index.js';
import { Target } from '../../../components/Target/index.js';

import { getReviewList } from '../../../apis';

import styles from './ExamReviewPage.module.css';
import { useIntersect } from '@/hooks';

export default function ExamReviewPage() {
  const { data, hasNextPage, isFetching, status, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['reviewList'],
      queryFn: ({ pageParam }) => getReviewList(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      staleTime: 1000 * 60 * 1,
    });

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { threshold: 0.8 }
  );

  const reviewList = data ? data.pages.flatMap((page) => page) : [];

  return (
    <main>
      <AppBar title='시험후기' />
      <Search
        className={styles.search}
        placeholder='시험후기 검색'
        onSearch={() => {}}
      />
      <PTR>
        <ul className={styles.list}>
          {status !== 'error' &&
            reviewList.map((post) => (
              <Link
                className={styles.to}
                key={post.postId}
                to={`/exam-review/${post.postId}`}
              >
                <PostBar data={post} />
              </Link>
            ))}
        </ul>
        {isFetching && <Loading />}
        <Target ref={ref} height='100px' />
      </PTR>
    </main>
  );
}

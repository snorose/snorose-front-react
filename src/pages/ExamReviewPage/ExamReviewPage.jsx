import { useInfiniteQuery } from '@tanstack/react-query';

import useIntersect from '../../hooks/useIntersect.jsx';

import { AppBar } from '../../components/AppBar';
import { Loading } from '../../components/Loading';
import { PostBar } from '../../components/PostBar';
import { PTR } from '../../components/PTR';
import { Search } from '../../components/Search';
import { Target } from '../../components/Target';

import { getReviewList } from '../../apis/examReview.js';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['reviewList'],
    queryFn: ({ pageParam }) => getReviewList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
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
          {reviewList.map((post) => (
            <PostBar key={post.postId} data={post} />
          ))}
        </ul>
        {isFetching && <Loading />}
        <Target ref={ref} height='100px' />
      </PTR>
    </main>
  );
}

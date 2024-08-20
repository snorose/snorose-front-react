import { Link } from 'react-router-dom';

import { getReviewList } from '@/apis';

import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx';

import { AppBar } from '@/components/AppBar';
import { Loading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { PTR } from '@/components/PTR';
import { Search } from '@/components/Search';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  const { data, ref, isFetching, status, Target } = useInfiniteScroll({
    queryKey: ['reviewList'],
    queryFn: ({ pageParam }) => getReviewList(pageParam),
  });

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
                to={`/board/exam-review/${post.postId}`}
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

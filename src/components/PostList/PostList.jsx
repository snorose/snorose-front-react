import { Link } from 'react-router-dom';

import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';

import { deduplicatePaginatedData, getBoardTitleToTextId } from '@/utils';

import styles from './PostList.module.css';

export default function PostList({ result, saveScrollPosition }) {
  const { data, ref, isLoading, isFetching, isError, error } = result;

  if (isLoading) {
    return <FetchLoading>검색 중</FetchLoading>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return (
        <FetchLoading animation={false}>검색 결과가 없습니다</FetchLoading>
      );
    }

    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const postList =
    data && !data.pages.includes(undefined)
      ? deduplicatePaginatedData(data.pages.flatMap((page) => page.data))
      : [];

  return (
    <div className={styles.posts}>
      {postList.map((post, index) => (
        <Link
          className={styles.to}
          ref={index === postList.length - 1 ? ref : undefined}
          key={post.postId}
          to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
          onClick={saveScrollPosition}
        >
          <PostBar data={post} hasComment={false} />
        </Link>
      ))}
      {isFetching && <FetchLoading />}
    </div>
  );
}

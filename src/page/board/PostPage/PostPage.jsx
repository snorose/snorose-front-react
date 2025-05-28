import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getPostContent } from '@/apis';

import { BackAppBar, Badge, FetchLoading, Icon } from '@/shared/component';
import { LIKE_TYPE, QUERY_KEY, ROLE } from '@/shared/constant';
import { convertHyperlink, fullDateTimeFormat, getBoard } from '@/shared/lib';

import { NotFoundPage } from '@/page/etc';

import { CommentInput, CommentListSuspense } from '@/feature/comment/component';
import { useCommentContext } from '@/feature/comment/context';
import { useLike } from '@/feature/like/hook';
import { useScrap } from '@/feature/scrap/hook';

import {
  DeleteConfirmModal,
  MyPostMoreOptionsModal,
  PostMoreOptionsModal,
  ReportConfirmModal,
  ReportTypesModal,
} from '@/feature/board/component';
import styles from './PostPage.module.css';

export default function PostPage() {
  const { postId } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { inputFocus, isInputFocused } = useCommentContext();
  const currentBoard = getBoard(pathname.split('/')[2]);
  const [modal, setModal] = useState({
    id: 'confirm-report-post',
    reportType: null,
  });

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    staleTime: 1000 * 60 * 5,
    enabled: !!currentBoard?.id && !!postId,
  });

  const { scrap, unscrap } = useScrap();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.post,
    sourceId: postId,
  });

  // 뱃지를 보여주는 ROLE
  const showBadge =
    data?.userRoleId === ROLE.official ||
    (data?.userRoleId === ROLE.admin && data?.userDisplay !== '익명송이');

  // 로딩과 에러 상태에 따라 조건부 렌더링
  if (isLoading) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading>게시글 불러오는 중...</FetchLoading>
      </>
    );
  }

  if (error?.response.status === 404) {
    return <NotFoundPage />;
  }

  if (isError) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading animation={false}>
          게시글을 찾을 수 없습니다.
        </FetchLoading>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar backgroundColor={'#eaf5fd'} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width={25} height={16} />
            <p>{data.userDisplay || 'Unknown'}</p>
            {showBadge && (
              <Badge userRoleId={data.userRoleId} className={styles.badge} />
            )}
            <p className={styles.dot}>·</p>
            <p>
              {fullDateTimeFormat(data.createdAt)}
              {data.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display: data.isNotice && !data.isWriter ? 'none' : 'block',
            }}
            className={styles.meatBall}
            onClick={() => {
              data.isWriter
                ? setModal({
                    id: 'my-post-more-options',
                    reportType: null,
                  })
                : setModal({
                    id: 'post-more-options',
                    reportType: null,
                  });
            }}
          >
            <Icon id='meat-ball' width={18} height={4} stroke='none' />
          </div>
        </div>
        <div className={styles.title}>
          <p>
            {data.title}
            <span className={styles.views}>
              &nbsp;&nbsp;{data.viewCount.toLocaleString()} views
            </span>
          </p>
        </div>
        <p
          className={styles.contentText}
          dangerouslySetInnerHTML={convertHyperlink(data.content)}
        ></p>
        <div className={styles.post_bottom}>
          <div
            className={styles.count}
            style={{
              display: data.isNotice ? 'none' : 'flex',
            }}
            onClick={inputFocus}
          >
            <Icon
              id='comment-stroke'
              width={20}
              height={16}
              fill={
                isInputFocused.isFocused === true &&
                isInputFocused.parent === 'post'
                  ? '#5F86BF'
                  : 'none'
              }
            />
            <p>댓글 {data.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() => (data.isLiked ? unlike.mutate() : like.mutate())}
          >
            <Icon
              id='like-stroke'
              width={16}
              height={15}
              stroke='#5F86BF'
              fill={data.isLiked ? '#5F86BF' : 'none'}
            />
            <p>공감 {data.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              data.isScrapped ? unscrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='scrap-stroke'
              width={13}
              height={16}
              stroke='#5F86BF'
              fill={data.isScrapped ? '#5F86BF' : 'none'}
            />
            <p>스크랩 {data.scrapCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {data.isNotice ? (
        <div className={styles.whiteBox} />
      ) : (
        <>
          <CommentListSuspense commentCount={data.commentCount} />
          <CommentInput />
        </>
      )}
      {(() => {
        switch (modal.id) {
          case 'post-more-options':
            return <PostMoreOptionsModal modal={modal} setModal={setModal} />;
          case 'my-post-more-options':
            return <MyPostMoreOptionsModal modal={modal} setModal={setModal} />;
          case 'report-post-types':
          case 'report-user-types':
            return <ReportTypesModal modal={modal} setModal={setModal} />;
          case 'confirm-report':
            return (
              <ReportConfirmModal
                modal={modal}
                setModal={setModal}
                data={data}
              />
            );
          case 'confirm-post-delete':
            return <DeleteConfirmModal modal={modal} setModal={setModal} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

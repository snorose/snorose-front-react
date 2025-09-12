import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostContent } from '@/apis';

import { NotFoundPage } from '@/page/etc';

import { convertHyperlink, fullDateTimeFormat, getBoard } from '@/shared/lib';
import { ModalContext } from '@/shared/context/ModalContext';
import { useModalReset } from '@/shared/hook/useBlocker';
import { BackAppBar, Badge, FetchLoading, Icon } from '@/shared/component';
import { LIKE_TYPE, QUERY_KEY, ROLE } from '@/shared/constant';

import { useDeletePostHandler } from '@/feature/board/hook/useDeletePostHandler';
import { PostModalRenderer } from '@/feature/board/component';

import { useCommentContext } from '@/feature/comment/context';
import { CommentInput, CommentListSuspense } from '@/feature/comment/component';

import { useReportHandler } from '@/feature/report/hook/useReport';
import { useLike } from '@/feature/like/hook';
import { useScrap } from '@/feature/scrap/hook';

import style from './PostPage.module.css';

export default function PostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentBoard = getBoard(pathname.split('/')[2]);

  const { modal, setModal } = useContext(ModalContext);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: QUERY_KEY.post(postId),
    queryFn: () => getPostContent(currentBoard?.id, postId),
    staleTime: 1000 * 60 * 5,
    enabled: !!currentBoard?.id && !!postId,
  });

  // 페이지 언마운트 시 모달 상태 초기화
  useModalReset();

  const { handleDelete } = useDeletePostHandler(currentBoard?.id);
  const { handleReport } = useReportHandler(modal, setModal, data);

  const handleEdit = () => {
    setModal({ id: null, type: null });
    navigate(`./edit`);
  };

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
    <div className={style.container}>
      <BackAppBar backgroundColor={'#eaf5fd'} />

      <div className={style.blueContainer}>
        <MetaContainer
          userDisplay={data.userDisplay}
          userRoleId={data.userRoleId}
          createdAt={data.createdAt}
          isEdited={data.isEdited}
          isNotice={data.isNotice}
          isWriter={data.isWriter}
          isCommentAlertConsent={data.isCommentAlertConsent}
        />

        <div className={style.titleContainer}>
          <h1 className={style.title}>{data.title}</h1>
          <span className={style.views}>
            &nbsp;&nbsp;{data.viewCount.toLocaleString()} views
          </span>
        </div>

        <p
          className={style.contentText}
          dangerouslySetInnerHTML={convertHyperlink(data.content)}
        ></p>

        <ActionContainer
          isNotice={data.isNotice}
          commentCount={data.commentCount}
          isLiked={data.isLiked}
          likeCount={data.likeCount}
          isScrapped={data.isScrapped}
          scrapCount={data.scrapCount}
        />
      </div>

      <CommentContainer
        isNotice={data.isNotice}
        commentCount={data.commentCount}
      />

      {/* PostPage에서 사용하는 모달 렌더러 */}
      <PostModalRenderer
        modal={modal}
        handleEdit={handleEdit}
        handleReport={handleReport}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function MetaContainer({
  userDisplay,
  userRoleId,
  createdAt,
  isEdited,
  isNotice,
  isWriter,
  isCommentAlertConsent,
}) {
  const { setModal } = useContext(ModalContext);

  // 뱃지를 보여주는 ROLE
  const showBadge =
    userRoleId === ROLE.official ||
    (userRoleId === ROLE.admin && userDisplay !== '익명송이');

  const onMenuOpen = () => {
    const id = isWriter ? 'my-post-more-options' : 'post-more-options';

    setModal({
      id,
      type: null,
    });
  };

  return (
    <div className={style.metaContainer}>
      <div className={style.meta}>
        <Icon id='cloud' width={25} height={16} />
        <p>{userDisplay || 'Unknown'}</p>
        {showBadge && <Badge userRoleId={userRoleId} className={style.badge} />}
        <p className={style.dot}>·</p>
        <p>
          {fullDateTimeFormat(createdAt)}
          {isEdited && ' (수정됨)'}
        </p>
      </div>

      <div className={style.actions}>
        <div className={style.commentBell}>
          <Icon
            id={isCommentAlertConsent ? 'comment-bell-fill' : 'comment-bell'}
            width={18}
            height={21}
          />
        </div>

        <div
          className={style.meatBall}
          style={{
            display: isNotice && !isWriter ? 'none' : 'block',
          }}
          onClick={onMenuOpen}
        >
          <Icon id='meat-ball' width={18} height={4} stroke='none' />
        </div>
      </div>
    </div>
  );
}

function ActionContainer({
  isNotice,
  commentCount,
  isLiked,
  likeCount,
  isScrapped,
  scrapCount,
}) {
  const { postId } = useParams();

  const { inputFocus, focusedItem } = useCommentContext();
  const { scrap, unscrap } = useScrap();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.post,
    sourceId: postId,
  });

  return (
    <div className={style.actionContainer}>
      <div
        className={style.count}
        style={{
          display: isNotice ? 'none' : 'flex',
          backgroundColor:
            focusedItem === 'post' ? 'var(--blue-1)' : 'transparent',
        }}
        onClick={inputFocus}
      >
        <Icon
          id='comment-stroke'
          width={18}
          height={15}
          style={{
            paddingTop: '0.1rem',
          }}
          stroke='var(--blue-3)'
          fill='none'
        />
        <p>댓글 {commentCount.toLocaleString()}</p>
      </div>
      <div
        className={style.count}
        onClick={() => (isLiked ? unlike.mutate() : like.mutate())}
      >
        <Icon
          id='like-stroke'
          width={16}
          height={15}
          stroke='var(--pink-2)'
          fill={isLiked ? 'var(--pink-2)' : 'none'}
        />
        <p>공감 {likeCount.toLocaleString()}</p>
      </div>
      <div
        className={style.count}
        onClick={() => (isScrapped ? unscrap.mutate() : scrap.mutate())}
      >
        <Icon
          id='scrap-stroke'
          width={13}
          height={16}
          stroke={'var(--green-1)'}
          fill={isScrapped ? 'var(--green-1)' : 'none'}
        />
        <p>스크랩 {scrapCount.toLocaleString()}</p>
      </div>
    </div>
  );
}

function CommentContainer({ isNotice, commentCount }) {
  return (
    <>
      {isNotice ? (
        <div className={style.whiteBox} />
      ) : (
        <>
          <CommentListSuspense commentCount={commentCount} />
          <CommentInput />
        </>
      )}
    </>
  );
}

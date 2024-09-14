import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostContent, deletePost } from '@/apis';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useLike, useScrap, useToast } from '@/hooks';

import { NotFoundPage } from '@/pages/NotFoundPage';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal/index.js';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';

import { timeAgo } from '@/utils';
import { BOARD_MENUS, LIKE_TYPE, QUERY_KEY, TOAST } from '@/constants';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { toast } = useToast();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  const { scrap, unscrap } = useScrap();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.post,
    sourceId: postId,
  });

  const handleDelete = async () => {
    try {
      const response = await deletePost(currentBoard.id, postId);

      if (response.status === 200) {
        toast(TOAST.POST.delete);
        navigate(`/board/${currentBoard.textId}`);
      }
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <BackAppBar />
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
        <BackAppBar />
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <BackAppBar />
        <FetchLoading animation={false}>
          게시글을 찾을 수 없습니다.
        </FetchLoading>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{data.userDisplay || 'Unknown'}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(data.createdAt)}
              {data.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display: data.isNotice && !data.isWriter ? 'none' : 'block',
            }}
            className={styles.dot3}
            onClick={() => {
              console.log(data);
              data.isWriter
                ? setIsOptionsModalOpen(true)
                : setIsReportModalOpen(true);
            }}
          >
            <Icon id='ellipsis-vertical' width='3' height='11' />
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
        <p className={styles.text}>{data.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{data.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() => (data.isLiked ? unlike.mutate() : like.mutate())}
          >
            <Icon
              id='like'
              width='13'
              height='12'
              fill={data.isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{data.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              data.isScrapped ? unscrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={data.isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{data.scrapCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <OptionModal
        id='post-more-options'
        isOpen={isOptionsModalOpen}
        setIsOpen={setIsOptionsModalOpen}
        closeFn={() => {
          setIsOptionsModalOpen(false);
        }}
        functions={{
          pencil: () => navigate(`./edit`),
          trash: () => {
            setIsOptionsModalOpen(false);
            setIsDeleteModalOpen(true);
          },
        }}
      />
      <DeleteModal
        id='post-delete'
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={handleDelete}
      />
      <OptionModal
        id='report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        closeFn={() => setIsReportModalOpen(false)}
      />
      <CommentList commentCount={data.commentCount} />
      <InputBar />
    </div>
  );
}

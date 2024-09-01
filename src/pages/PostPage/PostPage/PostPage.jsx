import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostContent, deletePost, updatePoint } from '@/apis';

import { useCommentContext } from '@/contexts/CommentContext.jsx';
import { useLike, useScrap, useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal/index.js';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';

import { timeAgo } from '@/utils';

import {
  BOARD_MENUS,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  TOAST,
} from '@/constants';

import { USER } from '@/dummy/data';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { toast } = useToast();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // 게시글 데이터 받아오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  const { scrap, deleteScrap } = useScrap();
  const { like, deleteLike } = useLike({ type: 'posts', typeId: postId });

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    try {
      const response = await deletePost(currentBoard.id, postId);

      if (response.status === 200) {
        const pointResponse = await updatePoint({
          userId: USER.userId, // 추후 id 연결 필요
          category: POINT_CATEGORY_ENUM.POST_DELETE,
          source: POINT_SOURCE_ENUM.POST,
          sourceId: postId,
        });

        if (pointResponse.status === 200) {
          toast(TOAST.POST_DELETE_SUCCESS);
          navigate(`/board/${currentBoard.textId}`);
        } else {
          throw new Error('Point update failed');
        }
      } else {
        throw new Error('Post delete failed');
      }
    } catch (error) {
      toast(TOAST.POST_DELETE_FAIL);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // 로딩과 에러 상태에 따라 조건부 렌더링
  if (isLoading) {
    return (
      <>
        <BackAppBar />
        <FetchLoading>게시글 불러오는 중...</FetchLoading>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BackAppBar />
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  if (!postData) {
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
            <p>{postData.userDisplay || 'Unknown'}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(postData.createdAt)}
              {postData.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display:
                postData.isNotice && !postData.isWriter ? 'none' : 'block',
            }}
            className={styles.dot3}
            onClick={() => {
              console.log(postData);
              postData.isWriter
                ? setIsOptionsModalOpen(true)
                : setIsReportModalOpen(true);
            }}
          >
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>
          <p>
            {postData.title}
            <span>&nbsp;&nbsp;{postData.viewCount.toLocaleString()} views</span>
          </p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{postData.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              postData.isLiked ? deleteLike.mutate() : like.mutate()
            }
          >
            <Icon
              id='like'
              width='13'
              height='12'
              fill={postData.isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              postData.isScrapped ? deleteScrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={postData.isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.scrapCount}</p>
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
      <CommentList commentCount={postData.commentCount} />
      <InputBar />
    </div>
  );
}

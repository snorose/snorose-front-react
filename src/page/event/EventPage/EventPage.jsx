import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getEventContent } from '@/apis';
import { NotFoundPage } from '@/page/etc';

import {
  BackAppBar,
  Badge,
  FetchLoading,
  Icon,
  PrimaryButton,
} from '@/shared/component';
import { LIKE_TYPE, QUERY_KEY, ROLE, TOAST } from '@/shared/constant';
import { convertHyperlink, fullDateTimeFormat, getBoard } from '@/shared/lib';
import { ModalContext } from '@/shared/context/ModalContext';
import { useModalReset } from '@/shared/hook/useBlocker';
import { useAuth, useToast } from '@/shared/hook';

import { GuideModal } from '@/feature/event/component';
import { isUrlValid } from '@/feature/event/lib';
import { EVENT_GUIDE_MODAL_OPTIONS } from '@/feature/event/constant';

import { CommentInput, CommentListSuspense } from '@/feature/comment/component';
import { useDeletePostHandler } from '@/feature/board/hook/useDeletePostHandler';
import { PostModalRenderer } from '@/feature/board/component';
import { useReportHandler } from '@/feature/report/hook/useReport';
import { useLike } from '@/feature/like/hook';
import { useScrap } from '@/feature/scrap/hook';
import { useCommentContext } from '@/feature/comment/context';

import styles from './EventPage.module.css';

export default function EventPage() {
  const { postId } = useParams();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { inputFocus, focusedItem } = useCommentContext();
  const { userInfo } = useAuth();
  const { toast } = useToast();
  const currentBoard = getBoard(pathname.split('/')[2]);

  const { modal, setModal } = useContext(ModalContext);

  // 페이지 언마운트 시 모달 상태 초기화
  useModalReset();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getEventContent(postId),
    staleTime: 1000 * 60 * 5,
    enabled: !!currentBoard?.id && !!postId,
  });

  const { handleDelete } = useDeletePostHandler(currentBoard?.id);
  const { handleReport } = useReportHandler(modal, setModal, data);

  const { scrap, unscrap } = useScrap();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.post,
    sourceId: postId,
  });

  const handleEdit = () => {
    setModal({ id: null, type: null });
    navigate(`./edit`);
  };

  // 신청 시간 판단
  const now = Date.now();
  const openDraw = data?.startAt ? new Date(data.startAt).getTime() : null;
  const closeDraw = data?.endAt ? new Date(data.endAt).getTime() : null;
  const beforeOpen = now < openDraw;
  const opened = now >= openDraw && now <= closeDraw;
  const closed = now > closeDraw;

  const [open, setOpen] = useState(false);

  // '신청하기'버튼 누르면 폼으로 이동
  const handleApplyClick = () => {
    if (!isUrlValid(data.link, { open: true })) {
      toast(TOAST.EVENT.FAIL);
    }
  };

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
                    type: null,
                  })
                : setModal({
                    id: 'post-more-options',
                    type: null,
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

        {['연극/뮤지컬'].includes(data.category) && (
          <div className={styles.host}>
            <Icon id='movie' width={20} height={20} />
            <p>공연명</p>
            <p className={styles.data}>{data.host}</p>
          </div>
        )}
        {['영화'].includes(data.category) && (
          <div className={styles.host}>
            <Icon id='movie' width={20} height={20} />
            <p>영화명</p>
            <p className={styles.data}>{data.host}</p>
          </div>
        )}
        {['기타'].includes(data.category) && (
          <div className={styles.host}>
            <Icon id='host' width={20} height={20} />
            <p>주최</p>
            <p className={styles.data}>{data.host}</p>
          </div>
        )}

        {['연극/뮤지컬', '영화'].includes(data.category) && (
          <div className={styles.place}>
            <Icon id='location' width={20} height={20} />
            <p>장소</p>
            <p className={styles.data}>{data.place}</p>
          </div>
        )}

        <div className={styles.drawCount}>
          <Icon id='person' width={20} height={20} />
          <p>추첨 인원</p>
          <p className={styles.data}>{data.drawCount} 명</p>
        </div>

        <div className={styles.applicationDate}>
          <Icon
            id='calendar-stroke'
            width={20}
            height={20}
            fill='none'
            stroke='#484848'
          />
          <p>응모 날짜</p>
          <p className={styles.data}>
            시작일 : {fullDateTimeFormat(data.startAt)} <br />
            종료일 : {fullDateTimeFormat(data.endAt)}
          </p>
        </div>

        <div className={styles.announceDate}>
          <Icon
            id='calendar-stroke'
            width={20}
            height={20}
            fill='none'
            stroke='#484848'
          />
          <p>당첨자 발표일</p>
          <p className={styles.data}>{fullDateTimeFormat(data.announceAt)}</p>
        </div>
        <p
          className={styles.contentText}
          dangerouslySetInnerHTML={convertHyperlink(data.content)}
        ></p>

        <div className={styles.note}>
          <p>
            ※ 공식 문의 창구 (이메일(snorose1906@gmail.com), 카카오톡 1:1 문의)
            이외의 문의는 받고 있지 않습니다. 공식 문의 창구 이외의 문의 글은
            답변 없이 삭제될 수 있음을 알려드립니다.
          </p>
        </div>

        {/* <div className={styles.iamges}></div> */}

        {beforeOpen && (
          <PrimaryButton className={styles.button} disabled>
            응모 시작 전이에요
          </PrimaryButton>
        )}

        {opened && (
          <>
            <PrimaryButton
              className={styles.button}
              onClick={() => setOpen(true)}
            >
              신청하기
            </PrimaryButton>

            {open && (
              <GuideModal
                boardName='event'
                options={EVENT_GUIDE_MODAL_OPTIONS}
                onConfirm={handleApplyClick}
                onClose={() => setOpen(false)}
                onIsLast='신청하기'
              />
            )}
          </>
        )}

        {closed && (
          <PrimaryButton className={styles.button} disabled>
            응모 마감
          </PrimaryButton>
        )}

        <div className={styles.postBottom}>
          <div
            className={styles.count}
            style={{
              display: data.isNotice ? 'none' : 'flex',
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
              stroke='var(--pink-2)'
              fill={data.isLiked ? 'var(--pink-2)' : 'none'}
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
              stroke={'var(--green-1)'}
              fill={data.isScrapped ? 'var(--green-1)' : 'none'}
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
          {userInfo.userRoleId === 4 ? <CommentInput /> : ''}
        </>
      )}

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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import {
  BackAppBar,
  Badge,
  CloseAppBar,
  FetchLoading,
  Icon,
} from '@/shared/component';
import {
  BOARD_MENUS,
  MUTATION_KEY,
  QUERY_KEY,
  ROLE,
  TOAST,
} from '@/shared/constant';
import { useAuth, useBlocker, useToast } from '@/shared/hook';
import { formattedNowTime } from '@/shared/lib';

import { getPostContent, patchPost, getEventContent, patchEvent } from '@/apis';
import { EventForm, NoticeForm } from '@/feature/event/component';

import styles from './EditEventPage.module.css';

export default function EditPostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { userInfo, status } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const boardTitle = currentBoard?.title || '';

  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userDisplay, setUserDisplay] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [eventType, setEventType] = useState('유형을 선택해주세요');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  // navigation guard
  useBlocker(isBlock);

  // 이벤트 게시글 내용 가져오기
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getEventContent(postId),
    enabled: !!currentBoard?.id && !!postId,
    placeholderData: {},
  });

  const [data, setData] = useState({
    category: '',
    isNotice: false,
    title: '',
    content: '',
    host: '',
    place: '',
    startDate: '',
    endDate: '',
    announceDate: '',
    drawCount: 1,
    link: '',
  });

  const [noticeData, setNoticeData] = useState({
    category: '',
    boardId: '',
    title: '',
    content: '',
    isNotice: false,
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (!eventData) return;
    setEventType(eventData.category || '유형을 선택해주세요');
    setIsNotice(eventData.isNotice);
    if (eventData.isNotice) {
      setNoticeData(eventData);
    } else {
      setData(eventData);
    }
  }, [eventData]);

  // isBlock 업데이트
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    setIsBlock(
      data.title !== title.trim() ||
        data.content !== text.trim() ||
        data.isNotice !== isNotice
    );
  }, [title, text, isNotice]);

  // 게시글 수정
  const mutation = useMutation({
    mutationKey: [MUTATION_KEY.editPost],
    mutationFn: patchEvent,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.post, postId]);
      navigate(-1);
      toast(TOAST.POST.edit);
      setSubmitDisabled(false);
    },
    onError: ({ response }) => {
      toast(response.data.message);
      setSubmitDisabled(false);
    },
  });

  // 게시글 수정 나머지 유효성 검사 및 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (submitDisabled) return;

    // setSubmitDisabled(true);
    // setIsBlock(false);

    if (eventData.isNotice) {
      // 데이터 확인용 나중에 지우기!!
      console.log('data:', noticeData);
      console.log('postId: ', postId);

      mutation.mutate({ ...noticeData, postId });
    } else {
      // 데이터 확인용 나중에 지우기!!
      console.log('data:', data, postId);
      console.log('postId: ', postId);

      mutation.mutate({
        ...data,
        postId,
      });
    }
  };

  const handleChange = (field, value) => {
    if (isNotice) {
      setNoticeData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // title, host, place 유효성 검사 (즉시)
    const newErrors = { ...errors };
    if (field === 'title' && value.length > 127) {
      newErrors.title = '제목은 127자 이하로 입력해주세요';
    } else if (field === 'host' && value.length > 20) {
      newErrors.host = '공연명은 20자 이하로 입력해주세요';
    } else if (field === 'place' && value.length > 20) {
      newErrors.place = '장소는 20자 이하로 입력해주세요';
    } else {
      delete newErrors[field];
    }

    setErrors(newErrors);
  };

  const renderForm = () => {
    if (isNotice || eventType === '공지사항') {
      return (
        <NoticeForm
          data={noticeData}
          onChange={handleChange}
          onValid={setFormValid}
        />
      );
    }
    // 유형별로 다르게 보여주고 싶으면 추가 분기
    if (eventType === '연극/뮤지컬') {
      return (
        <EventForm
          formType='theater'
          data={data}
          onChange={handleChange}
          onValid={setFormValid}
        />
      );
    }
    if (eventType === '영화') {
      return (
        <EventForm
          formType='movie'
          data={data}
          onChange={handleChange}
          onValid={setFormValid}
        />
      );
    }
    if (eventType === '기타') {
      return (
        <EventForm
          formType='etc'
          data={data}
          onChange={handleChange}
          onValid={setFormValid}
        />
      );
    }
    return null;
  };

  if (status === 'loading' || isLoading) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading>로딩 중...</FetchLoading>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BackAppBar animation={false} notFixed />
        <FetchLoading>게시글 정보를 불러오지 못했습니다</FetchLoading>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <CloseAppBar
            children={<p onClick={handleSubmit}>수정</p>}
            backgroundColor={'#eaf5fd'}
          />
        </div>
        <div className={styles.center}>
          <div className={styles.categorySelect}>
            <div className={styles.categorySelectContainer}>
              <Icon id='clip-board-list' width={21} height={22} fill='white' />
              <p className={styles.categorySelectText}>{eventType}</p>
            </div>
          </div>
          <div className={styles.profileBox}>
            <div className={styles.profileBoxLeft}>
              {userInfo?.userRoleId !== ROLE.admin &&
              userInfo?.userRoleId !== ROLE.official ? (
                <Icon id='cloud' width={25} height={16} />
              ) : (
                <Badge
                  userRoleId={userInfo?.userRoleId}
                  className={styles.badge}
                />
              )}
              <p>{userDisplay}</p>
              <p className={styles.dot}></p>
              <p>{formattedNowTime()}</p>
            </div>
          </div>
          <div className={styles.form}>{renderForm()}</div>
        </div>
      </div>
    </>
  );
}

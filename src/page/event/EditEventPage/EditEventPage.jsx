import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  BackAppBar,
  Badge,
  CloseAppBar,
  FetchLoading,
  Icon,
  ActionButton,
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

import { getEventContent, patchEvent } from '@/apis';
import { EventForm, NoticeForm } from '@/feature/event/component';
import { validateOnSubmit } from '@/feature/event/lib';
import {
  EVENT_FORM_DATA,
  NOTICE_FORM_DATA,
  EVENT_TYPES,
} from '@/feature/event/constant';

import styles from './EditEventPage.module.css';

export default function EditEventPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { userInfo, status } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');
  const [isNotice, setIsNotice] = useState(false);
  const [userDisplay, setUserDisplay] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [eventType, setEventType] = useState('유형을 선택해주세요');
  const [data, setData] = useState(() => EVENT_FORM_DATA(eventType));
  const [noticeData, setNoticeData] = useState(() => NOTICE_FORM_DATA(boardId));
  const [errors, setErrors] = useState({});

  // navigation guard
  const isBlock = !!(data || noticeData);
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

  // 데이터 화면 표시
  useEffect(() => {
    if (!eventData) return;
    setEventType(eventData.category || '유형을 선택해주세요');
    setIsNotice(eventData.isNotice);
    if (eventData.isNotice) {
      setNoticeData((prev) => ({ ...prev, ...eventData }));
    } else {
      setData((prev) => ({ ...prev, ...eventData }));
    }
  }, [eventData]);

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
      if (EVENT_TYPES[eventType] === 'theater') {
        newErrors.host = '공연명은 20자 이하로 입력해주세요';
      } else if (EVENT_TYPES[eventType] === 'movie') {
        newErrors.host = '영화명은 20자 이하로 입력해주세요';
      } else {
        newErrors.host = '주최사는 20자 이하로 입력해주세요';
      }
    } else if (field === 'place' && value.length > 20) {
      newErrors.place = '장소는 20자 이하로 입력해주세요';
    } else {
      delete newErrors[field];
    }

    setErrors(newErrors);
    setSubmitDisabled(false);
  };

  // 이벤트 유형에 따른 폼 렌더링
  const renderForm = () => {
    if (eventType === '공지사항') {
      return (
        <NoticeForm
          data={noticeData}
          onChange={handleChange}
          onValid={setSubmitDisabled}
          errors={errors}
        />
      );
    }

    const formType = EVENT_TYPES[eventType];
    if (!formType) return null;

    return (
      <EventForm
        formType={formType}
        data={data}
        onChange={handleChange}
        onValid={setSubmitDisabled}
        errors={errors}
      />
    );
  };

  // 게시글 수정 나머지 유효성 검사 및 제출
  const handleSubmit = (e) => {
    const submitErrors = validateOnSubmit(data);
    e.preventDefault();

    if (eventData.isNotice) {
      // 이벤트 공지사항 수정
      // 데이터 확인용 나중에 지우기!!
      console.log('data:', noticeData);
      console.log('postId: ', postId);

      setSubmitDisabled(true);

      mutation.mutate({ ...noticeData, postId });
    } else {
      // 이벤트 수정
      if (Object.keys(submitErrors).length > 0) {
        setErrors(submitErrors);
        setSubmitDisabled(false);
        return;
      }

      // 데이터 확인용 나중에 지우기!!
      console.log('data:', data, postId);
      console.log('postId: ', postId);

      setSubmitDisabled(true);

      mutation.mutate({
        ...data,
        postId,
      });
    }
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
            // children={<p onClick={handleSubmit}>수정</p>}
            backgroundColor={'#eaf5fd'}
          >
            <ActionButton onClick={handleSubmit} disabled={!submitDisabled}>
              수정
            </ActionButton>
          </CloseAppBar>
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

import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  ActionButton,
  Badge,
  CloseAppBar,
  FetchLoading,
  Icon,
} from '@/shared/component';
import { BOARD_ID, QUERY_KEY, ROLE, TOAST } from '@/shared/constant';
import { useAuth, useBlocker, useToast } from '@/shared/hook';
import { formattedNowTime, getBoard, isUrlValid } from '@/shared/lib';

import { postEvent, postPost } from '@/apis';
import { DropDownMenu } from '@/feature/board/component';

import styles from './WriteEventPage.module.css';
import { EventForm, NoticeForm } from '@/feature/event/component';
import { bool } from 'prop-types';

export default function WritePostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [text, setText] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isNotice, setIsNotice] = useState(false);

  // navigation guard
  const isBlock = title.trim().length > 0 || text.trim().length > 0;

  useBlocker(isBlock);

  const textId = pathname.split('/')[2];
  const currentBoard = getBoard(textId);
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');
  const [eventType, setEventType] = useState('유형을 선택해주세요');

  const { invalidUserInfoQuery } = useAuth();

  const [formValid, setFormValid] = useState(false);

  const displayedTypes = ['공지사항', '연극/뮤지컬', '영화', '기타'];

  // 이벤트 유형 선택 핸들러
  const handleDropDownOpen = () => {
    setDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    const isNowNotice = eventType === '공지사항';
    setIsNotice(isNowNotice);

    if (isNowNotice) {
      setNoticeData((prev) => ({
        ...prev,
        isNotice: true,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        category: eventType,
        isNotice: false,
      }));
    }
  }, [eventType]);

  // 유형에 따른 폼 렌더링
  const renderForm = () => {
    switch (eventType) {
      case '공지사항':
        return (
          <NoticeForm
            data={noticeData}
            onChange={handleChange}
            onValid={setFormValid}
            errors={errors}
          />
        );
      case '연극/뮤지컬':
        return (
          <EventForm
            formType='theater'
            data={data}
            onChange={handleChange}
            onValid={setFormValid}
            errors={errors}
          />
        );
      case '영화':
        return (
          <EventForm
            formType='movie'
            data={data}
            onChange={handleChange}
            onValid={setFormValid}
            errors={errors}
          />
        );
      case '기타':
        return (
          <EventForm
            formType='etc'
            data={data}
            onChange={handleChange}
            onValid={setFormValid}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const INIT_DATA = {
    category: eventType,
    isNotice: eventType === '공지사항',
    title: '',
    content: '',
    host: '',
    place: '',
    startDate: '',
    endDate: '',
    announceDate: '',
    drawCount: 1,
    link: '',
  };
  const [data, setData] = useState(INIT_DATA);

  const INIT_NOTICE = {
    category: '',
    boardId: boardId,
    title: '',
    content: '',
    isNotice: eventType === '공지사항',
  };
  const [noticeData, setNoticeData] = useState(INIT_NOTICE);

  const [errors, setErrors] = useState({});

  // eventType 변경시 내용 초기화
  useEffect(() => {
    if (eventType === '공지사항') {
      setNoticeData(INIT_NOTICE);
    } else {
      setData(INIT_DATA);
    }
  }, [eventType]);

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
      if (data.formType === 'theater') {
        newErrors.host = '공연명은 20자 이하로 입력해주세요';
      } else if (data.formType === 'movie') {
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

  const validateOnSubmit = (data) => {
    const errors = {};

    // 종료일 검증
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      errors.endDate = '종료일은 시작일보다 빠를 수 없어요';
      setSubmitDisabled(false);
    }

    // 발표일 검증
    if (
      data.announceDate &&
      ((data.startDate && data.announceDate < data.startDate) ||
        (data.endDate && data.announceDate < data.endDate))
    ) {
      errors.announceDate = '발표일은 종료일 이후로 설정해주세요';
      setSubmitDisabled(false);
    }

    // 상세설명 검증
    if (data.content.length < 5) {
      errors.content = '상세설명은 5자 이상 적어주세요';
      setSubmitDisabled(false);
    }

    // 연계링크 검증
    console.log(isUrlValid(data.link));
    if (!isUrlValid(data.link)) {
      errors.link = '유효한 링크를 넣어주세요';
      setSubmitDisabled(false);
    }

    return errors;
  };

  // '등록' 클릭 이벤트와 유효성 검사
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitErrors = validateOnSubmit(data);

    if (Object.keys(submitErrors).length > 0) {
      console.log('날짜설정 에러');
      setErrors(submitErrors);
      return;
    }

    setSubmitDisabled(true);

    // 추후 삭제
    console.log(data);
    console.log('등록');

    // 백엔드 리팩토링 후 주석 제거 및 테스트 필요
    // let request;
    // if (isNotice) {
    //   // 확인용!! 나중에 지우기
    //   console.log('이벤트 공지 제출 시작', noticeData);

    //   request = postPost(noticeData);
    // } else {
    //   // 확인용!! 나중에 지우기
    //   console.log('이벤트 제출 시작', data);

    //   request = postEvent(data);
    // }

    // request
    //   .then((response) => {
    //     if (response.status === 201) {
    //       const newPostId = response.data.result.postId;

    //       queryClient.removeQueries([QUERY_KEY.post]);
    //       invalidUserInfoQuery();
    //       isNotice
    //         ? navigate(`/board/event/notice`, {
    //             replace: true,
    //           })
    //         : navigate(`/board/event/post/${newPostId}`, {
    //             replace: true,
    //           });
    //     }
    //   })
    //   .catch(({ response }) => {
    //     toast(response.data.message);
    //     console.log(response.data);
    //   })
    //   .finally(() => {
    //     setSubmitDisabled(false);
    //   });
  };

  if (status === 'loading') {
    return (
      <>
        <FetchLoading>로딩 중...</FetchLoading>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <CloseAppBar backgroundColor={'#eaf5fd'}>
            <ActionButton onClick={handleSubmit} disabled={!formValid}>
              등록
            </ActionButton>
          </CloseAppBar>
        </div>
        <div className={styles.center}>
          {textId === 'notice' ? (
            <div className={styles.categorySelect}>
              <div className={styles.categorySelectContainer}>
                <Icon
                  id='clip-board-list'
                  width={21}
                  height={22}
                  fill='white'
                />
                <p className={styles.categorySelectText}>이벤트</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.categorySelect}
                onClick={handleDropDownOpen}
              >
                <div className={styles.categorySelectContainer}>
                  <Icon
                    id='clip-board-list'
                    width={21}
                    height={22}
                    fill='white'
                  />
                  <p className={styles.categorySelectText}>{eventType}</p>
                </div>
                <Icon id='angle-down' width={14} height={7} />
              </div>
              <DropDownMenu
                options={displayedTypes}
                item={eventType}
                setItem={setEventType}
                dropDownOpen={dropDownOpen}
                setDropDownOpen={setDropDownOpen}
                backgroundColor={'#fff'}
              />
            </>
          )}

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
              <p>{userInfo?.nickname}</p>
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

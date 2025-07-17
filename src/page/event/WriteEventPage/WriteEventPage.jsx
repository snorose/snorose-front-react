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
import { formattedNowTime, getBoard } from '@/shared/lib';

import { postPost } from '@/apis';
import { DropDownMenu } from '@/feature/board/component';

import styles from './WriteEventPage.module.css';
import { EventForm, NoticeForm } from '@/feature/event/component';

export default function WritePostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // navigation guard
  const isBlock = title.trim().length > 0 || text.trim().length > 0;

  useBlocker(isBlock);

  const textId = pathname.split('/')[2];
  const currentBoard = getBoard(textId);
  const [eventType, setEventType] = useState('유형을 선택해주세요');

  const { invalidUserInfoQuery } = useAuth();

  // 무슨 역할?? 인지 파악하기
  //const pass = boardId && title.trim() && text.trim();
  const pass = title.trim() && text.trim();

  const displayedTypes = ['공지사항', '연극/뮤지컬', '영화', '기타'];

  // 이벤트 유형 선택 핸들러
  const handleDropDownOpen = () => {
    setDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      category: eventType,
    }));
  }, [eventType]);

  // 유형에 따른 폼 렌더링
  const renderForm = () => {
    switch (eventType) {
      case '공지사항':
        return <NoticeForm data={data} onChange={handleChange} />;
      case '연극/뮤지컬':
        return (
          <EventForm formType='theater' data={data} onChange={handleChange} />
        );
      case '영화':
        return (
          <EventForm formType='movie' data={data} onChange={handleChange} />
        );
      case '기타':
        return <EventForm formType='etc' data={data} onChange={handleChange} />;
      default:
        return null;
    }
  };

  const [data, setData] = useState({
    category: eventType,
    boardId: BOARD_ID['event'],
    isNotice: eventType === '공지사항' ? true : isNotice,
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

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));

    // 간단한 유효성 검사
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

  const handleSubmit = () => {
    // 모든 필드 에러 체크
    if (Object.keys(errors).length > 0) {
      alert('입력값을 확인해주세요');
      return;
    }

    // axios 요청 또는 백엔드 전송 로직...
    console.log('제출 완료', data);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (submitDisabled) return;

  //     setSubmitDisabled(true);

  //     console.log(data);

  //     // // 게시글 등록
  //     // postPost(data)
  //     //   .then((response) => {
  //     //     if (response.status === 201) {
  //     //       console.log(response.data.result.pointDifference);
  //     //       !response.data.result.pointDifference
  //     //         ? toast(TOAST.POST.createNoPoints)
  //     //         : toast(TOAST.POST.create);
  //     //       const newPostId = response.data.result.postId;

  //     //       queryClient.removeQueries([QUERY_KEY.post]);
  //     //       invalidUserInfoQuery();
  //     //       // 공지글 전송시 notice: true로 재표시
  //     //       //   currentBoard.id === 12 || isNotice
  //     //       //     ? navigate(`/board/${currentBoard.textId}/notice`, {
  //     //       //         replace: true,
  //     //       //       })
  //     //       //     : navigate(
  //     //       //         `/board/${BOARD_MENUS.find((menu) => menu.id === boardId).textId}/post/${newPostId}`,
  //     //       //         { replace: true }
  //     //       //       );
  //     //     }
  //     //   })
  //     //   .catch(({ response }) => {
  //     //     toast(response.data.message);
  //     //   })
  //     //   .finally(() => {
  //     //     setSubmitDisabled(false);
  //     //   });
  //   };

  // 제목 127자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 127) {
      setTitle(newValue);
    }
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
            <ActionButton onClick={handleSubmit}>등록</ActionButton>
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
            {/* 공지글 선택시 공지글로 전송됨
            {textId !== 'notice' && (
              <div
                className={
                  userInfo?.userRoleId === ROLE.admin ||
                  userInfo?.userRoleId === ROLE.official
                    ? styles.profileBoxRight
                    : styles.profileBoxRightInvisible
                }
                onClick={handleIsNotice}
              >
                <Icon
                  id={isNotice ? 'check-circle-blue' : 'check-circle-grey'}
                  width={21}
                  height={22}
                />
                <p>공지글</p>
              </div>
            )} */}
          </div>
          {/* 공지사항, 일반글 폼 
          <div className={styles.content}>
            <TextareaAutosize
              className={styles.title}
              placeholder='제목'
              value={title}
              onChange={handleTitleChange}
            />
            <TextareaAutosize
              className={styles.text}
              placeholder='내용'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div> */}
          <div className={styles.form}>{renderForm()}</div>
        </div>
      </div>
    </>
  );
}

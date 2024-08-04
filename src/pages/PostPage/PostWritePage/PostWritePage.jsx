import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { CloseAppBar } from '../../../components/AppBar';
import { TOAST } from '../../../constants';
import { BOARD_MENUS } from '../../../constants';
import { DropDownMenu } from '../../../components/DropDownMenu';
import formattedNowTime from '../../../utils/formattedNowTime';
import styles from './PostWritePage.module.css';
import useToast from '../../../hooks/useToast';

export default function PostWritePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNotice, setIsNotice] = useState(false);
  const [item, setItem] = useState('게시판을 선택해주세요');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const roleId = 4; // 더미 역할 ID
  const boardTitles = BOARD_MENUS.map((menu) => menu.title);

  // 게시판 선택
  const handleDropDownOpen = () => {
    setDropDownOpen((prev) => !prev);
  };

  // 공지 여부 선택
  const handleIsNotice = () => {
    setIsNotice((prev) => !prev);
  };

  // 게시글 등록 유효성 검사 (오류 토스트 띄우기)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast(TOAST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.emptyText);
      return;
    }
    console.log('제목:', title);
    console.log('내용:', text);
    navigate('/post');
  };

  // 제목 40자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 40) {
      setTitle(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <CloseAppBar children='등록' stroke='#000' onClick={handleSubmit} />
      </div>
      <div className={styles.center}>
        <div className={styles.categorySelect} onClick={handleDropDownOpen}>
          <div>
            <Icon id='clip-board-list' width='18' height='19' />
            <p className={styles.categorySelectText}>{item}</p>
          </div>
          <Icon id='angle-down' width='14' height='7' />
        </div>
        <DropDownMenu
          options={boardTitles}
          item={item}
          setItem={setItem}
          dropDownOpen={dropDownOpen}
          setDropDownOpen={setDropDownOpen}
          backgroundColor={'#fff'}
        />
        <div className={styles.profileBox}>
          <div className={styles.profileBoxLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>김준희</p>
            <p className={styles.dot}></p>
            <p>{formattedNowTime()}</p>
          </div>
          <div
            className={
              roleId === 4
                ? styles.profileBoxRight
                : styles.profileBoxRightInvisible
            }
            onClick={handleIsNotice}
          >
            <p>공지글</p>
            <Icon
              id={isNotice ? 'toggle-on' : 'toggle-off'}
              width='25'
              height='16'
            />
          </div>
        </div>
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
        </div>
      </div>
      <div
        className={styles.bottom}
        onClick={(e) => {
          setDropDownOpen(false);
        }}
      ></div>
    </div>
  );
}

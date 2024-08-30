import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  postExamReview,
  updatePoint,
  checkExamReviewDuplication,
} from '@/apis';

import { useToast } from '@/hooks';

import { ActionButton, CloseAppBar } from '@/components/AppBar';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '@/components/Fieldset';
import { ConfirmModal } from '@/components';
import { Icon } from '@/components/Icon';
import { InputItem, InputList } from '@/components/Input';
import { Textarea } from '@/components/Fieldset';

import {
  BOARD_ID,
  CLASS_NUMBERS,
  EXAM_TYPES,
  LECTURE_TYPES,
  MODAL_CONFIRM,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  SEMESTERS,
  TOAST,
  YEARS,
} from '@/constants';

import styles from './ExamReviewWritePage.module.css';

const FILE_MAX_SIZE = 1024 * 1024 * 10;
const USER_ID = 62;

export default function ExamReviewWritePage() {
  const { toast } = useToast();
  const [lectureName, setLectureName] = useState('');
  const [professor, setProfessor] = useState('');
  const [lectureType, setLectureType] = useState({});
  const [examType, setExamType] = useState({});
  const [lectureYear, setLectureYear] = useState({});
  const [semester, setSemester] = useState({});
  const [isPF, setIsPF] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [classNumber, setClassNumber] = useState({});
  const [questionDetail, setQuestionDetail] = useState('');
  const [file, setFile] = useState();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const navigate = useNavigate();

  const pass =
    lectureName &&
    professor &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber &&
    file;

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    event.target.value = '';

    if (selectedFile?.size > FILE_MAX_SIZE) {
      alert('파일은 최대 10MB까지 업로드 할 수 있습니다.');
      return;
    }
    setFile(selectedFile);
  };

  const formBody = {
    isPF,
    boardId: BOARD_ID['exam-review'],
    classNumber: classNumber?.id,
    lectureName,
    professor,
    questionDetail,
    semester: semester?.id,
    lectureType: lectureType?.id,
    content: '',
    examType: examType?.id,
    lectureYear: lectureYear?.id,
    isOnline,
    category: '',
  };

  return (
    <main className={styles.main}>
      <CloseAppBar>
        <ActionButton
          onClick={async () => {
            if (!pass) {
              toast(TOAST.EXAM_REVIEW_CREATE_VALIDATE);
              return;
            }

            try {
              const { data } = await checkExamReviewDuplication({
                lectureName,
                professor,
                classNumber: classNumber?.id,
                lectureYear: lectureYear?.id,
                semester: semester?.id,
                examType: examType?.id,
              });

              if (data.result.isDuplicated) {
                setIsConfirmModalOpen(true);
              } else {
                const { data, status } = await postExamReview({
                  data: formBody,
                  file,
                });

                if (status === 201) {
                  updatePoint({
                    userId: USER_ID, // userId로 교체해야합니다.
                    category: POINT_CATEGORY_ENUM.EXAM_REVIEW_CREATE,
                    source: POINT_SOURCE_ENUM.REVIEW,
                    sourceId: data.result.postId,
                  }).then(({ status }) => {
                    if (status === 200) {
                      toast(TOAST.EXAM_REVIEW_CREATE);
                    }
                  });
                  navigate('/board/exam-review');
                }
              }
            } catch (error) {
              if (error.response.status === 500) {
                toast(TOAST.SERVER_ERROR_500);
              }
            }
          }}
        >
          게시
        </ActionButton>
      </CloseAppBar>
      <InputList>
        <InputItem
          tag='강의명'
          value={lectureName}
          placeholder='강의명을 입력하세요'
          setFn={setLectureName}
        />
        <InputItem
          tag='교수명'
          value={professor}
          placeholder='교수명을 입력하세요'
          setFn={setProfessor}
        />
      </InputList>
      <CategoryFieldset title='강의 종류' required>
        {LECTURE_TYPES.map((option) => (
          <CategoryButton
            key={option.id}
            select={lectureType}
            option={option}
            callback={setLectureType}
          >
            {option.name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='시험 종류' required>
        {EXAM_TYPES.map((option) => (
          <CategoryButton
            key={option.id}
            select={examType}
            option={option}
            callback={setExamType}
          >
            {option.name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='수강 연도' required>
        <Dropdown
          options={YEARS}
          select={lectureYear}
          setFn={setLectureYear}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='수강 학기' required>
        <Dropdown
          options={SEMESTERS}
          select={semester}
          setFn={setSemester}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset
        title='P/F 여부'
        required
        hasCheckbox
        value={isPF}
        setFn={setIsPF}
      />
      <CategoryFieldset
        title='온라인(비대면 수업) 여부'
        required
        hasCheckbox
        value={isOnline}
        setFn={setIsOnline}
      />
      <CategoryFieldset title='수강 분반' required>
        <Dropdown
          options={CLASS_NUMBERS}
          select={classNumber}
          setFn={setClassNumber}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='시험 유형 및 설명'>
        <Textarea
          value={questionDetail}
          setFn={setQuestionDetail}
          placeholder='강의 시험 유형 및 부가적인 설명을 기술해주세요'
          minRows='5'
          maxRows='10'
        />
      </CategoryFieldset>
      <div className={styles.file}>
        <div className={styles.left}>
          <Icon id='clip-board-list-blue' width={18} height={19} />
          <span className={styles.tag}>첨부파일</span>
        </div>
        <div className={styles.right}>
          <label htmlFor='file'>{file?.name ?? '첨부된 파일이 없어요'}</label>
          <input id='file' type='file' accept='.pdf' onChange={handleFile} />
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={MODAL_CONFIRM.EXAM_REVIEW_DUPLICATION.title}
        message={MODAL_CONFIRM.EXAM_REVIEW_DUPLICATION.message}
        primaryButtonText='확인'
        secondaryButtonText='취소'
        onPrimaryButtonClick={async () => {
          try {
            const { data, status } = await postExamReview({
              data: formBody,
              file,
            });

            if (status === 201) {
              updatePoint({
                userId: USER_ID, // userId로 교체해야합니다.
                category: POINT_CATEGORY_ENUM.EXAM_REVIEW_CREATE,
                source: POINT_SOURCE_ENUM.REVIEW,
                sourceId: data.result.postId,
              }).then(({ status }) => {
                if (status === 200) {
                  toast(TOAST.EXAM_REVIEW_CREATE);
                }
              });
              navigate('/board/exam-review');
            }
          } catch (error) {
            if (error.response.status === 500) {
              toast(TOAST.SERVER_ERROR_500);
            }
          }
        }}
        onSecondaryButtonClick={() => {
          setIsConfirmModalOpen(false);
        }}
      />
    </main>
  );
}

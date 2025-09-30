import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postExamReview, checkExamReviewDuplication } from '@/apis';

import { useAuth, useBlocker, useToast } from '@/shared/hook';
import { ModalContext } from '@/shared/context/ModalContext';
import {
  ActionButton,
  CloseAppBar,
  Dropdown,
  FetchLoadingOverlay,
  Icon,
  ConfirmModal,
  Textarea,
} from '@/shared/component';
import { validClassNumber } from '@/shared/lib';
import {
  BOARD_ID,
  MUTATION_KEY,
  QUERY_KEY,
  TOAST,
  CONFIRM_MODAL_TEXT,
} from '@/shared/constant';

import {
  CategoryButton,
  CategoryFieldset,
  InputItem,
  InputList,
  TextField,
} from '@/feature/exam/component';
import {
  EXAM_TYPES,
  FILE_MAX_SIZE,
  LECTURE_TYPES,
  SEMESTERS,
  YEARS,
} from '@/feature/exam/constant';

import styles from './WriteExamReviewPage.module.css';

export default function WriteExamReviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { invalidUserInfoQuery } = useAuth();
  const queryClient = useQueryClient();
  const { modal, setModal } = useContext(ModalContext);
  const createExamReview = useMutation({
    mutationKey: [MUTATION_KEY.createExamReview],
    mutationFn: ({ data, file }) =>
      postExamReview({
        data,
        file,
      }),
    onSuccess: ({ data }) => {
      const {
        result: { postId },
      } = data;

      queryClient.removeQueries([QUERY_KEY.post]);
      invalidUserInfoQuery();
      toast({ message: TOAST.EXAM_REVIEW.create, variant: 'success' });
      navigate(`/board/exam-review/post/${postId}`, { replace: true });
    },
    onError: ({ response }) => {
      const { status } = response;

      if (status === 500) {
        toast({ message: TOAST.ERROR.SERVER, variant: 'error' });
        return;
      }

      toast({ message: response.data.message, variant: 'error' });
    },
    onSettled: () => {
      setLoading(false);
      setIsCalled(false);
    },
  });

  const [lectureName, setLectureName] = useState('');
  const [professor, setProfessor] = useState('');
  const [lectureType, setLectureType] = useState({});
  const [examType, setExamType] = useState({});
  const [lectureYear, setLectureYear] = useState({});
  const [semester, setSemester] = useState({});
  const [isPF, setIsPF] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [classNumber, setClassNumber] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [file, setFile] = useState();

  const [isCalled, setIsCalled] = useState();
  const [loading, setLoading] = useState();

  const pass =
    lectureName.trim() &&
    professor.trim() &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber &&
    questionDetail.trim() &&
    file;

  // navigation guard

  const [isBlock, setIsBlock] = useState(false);
  useEffect(() => {
    setIsBlock(
      !!(
        lectureName.trim() ||
        professor.trim() ||
        Object.keys(lectureType).length > 0 ||
        Object.keys(examType).length > 0 ||
        Object.keys(lectureYear).length > 0 ||
        Object.keys(semester).length > 0 ||
        classNumber ||
        questionDetail.trim() ||
        file
      )
    );
  }, [
    lectureName,
    professor,
    lectureType,
    examType,
    lectureYear,
    semester,
    classNumber,
    questionDetail,
    file,
  ]);

  useBlocker(isBlock);

  // 게시글 수정 중 페이지 이탈
  const handleExitPage = () => {
    setIsBlock(false);
    setModal({ id: null, type: null });
    navigate(-1);
  };

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    event.target.value = '';

    if (selectedFile?.size > FILE_MAX_SIZE) {
      alert('파일은 최대 10MB까지 업로드 할 수 있습니다.');
      return;
    }
    setFile(selectedFile);
  };

  const checkDuplication = async () => {
    try {
      return await checkExamReviewDuplication({
        lectureName,
        professor,
        classNumber: Number(classNumber),
        lectureYear: lectureYear?.id,
        semester: semester?.id,
        examType: examType?.id,
      });
    } catch (error) {
      toast({ message: error, variant: 'error' });
      setIsCalled(false);
      throw error;
    }
  };

  const formBody = {
    isPF,
    boardId: BOARD_ID['exam-review'],
    classNumber: Number(classNumber),
    lectureName,
    professor,
    questionDetail,
    semester: semester?.id,
    lectureType: lectureType?.id,
    examType: examType?.id,
    lectureYear: lectureYear?.id,
    isOnline,
  };

  return (
    <section className={styles.container}>
      <CloseAppBar>
        <ActionButton
          onClick={async () => {
            if (isCalled) {
              return;
            }

            setIsCalled(true);

            try {
              const response = await checkDuplication();

              if (response?.data.result.isDuplicated) {
                setModal({ id: 'exam-review-duplication', type: null });
                return;
              }
            } catch (error) {
              return;
            }

            setLoading(true);
            createExamReview.mutate({
              data: formBody,
              file,
            });
          }}
          disabled={!pass}
        >
          게시
        </ActionButton>
      </CloseAppBar>
      <InputList>
        <InputItem
          tag='강의명'
          required
          value={lectureName}
          placeholder='강의명을 입력하세요'
          setFn={setLectureName}
        />
        <InputItem
          tag='교수명'
          required
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
      <CategoryFieldset title='수강 분반' required>
        <TextField
          value={classNumber}
          onChange={(event) => {
            const { value } = event.target;

            if (validClassNumber(value)) {
              setClassNumber(value);
            }
          }}
          placeholder='수강 분반을 입력하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset
        title='P/F 수업입니다'
        hasCheckbox
        checked={isPF}
        setFn={setIsPF}
      />
      <CategoryFieldset
        title='온라인 수업입니다'
        hasCheckbox
        checked={isOnline}
        setFn={setIsOnline}
      />
      <CategoryFieldset title='문항 수 및 시험 유형 설명' required>
        <Textarea
          value={questionDetail}
          setFn={setQuestionDetail}
          placeholder='ex) n문제 중 n문제 복기'
          minRows='5'
          maxRows='10'
        />
      </CategoryFieldset>
      <div className={styles.file}>
        <div className={styles.left}>
          <Icon id='clip-board-list' width={18} height={19} fill='#BFD7EC' />
          <span className={styles.tag}>첨부파일</span>
          <span className={styles.required}></span>
        </div>
        <div className={styles.right}>
          <label htmlFor='file'>{file?.name ?? '첨부된 파일이 없어요'}</label>
          <input id='file' type='file' accept='.pdf' onChange={handleFile} />
        </div>
      </div>
      {/* 중복 후기 모달 */}
      {modal.id === 'exam-review-duplication' && (
        <ConfirmModal
          modalText={CONFIRM_MODAL_TEXT.EXAM_REVIEW_DUPLICATION}
          onConfirm={() => {
            setLoading(true);
            createExamReview.mutate({
              data: formBody,
              file,
            });
            setModal({ id: null, type: null });
          }}
          onCancel={() => {
            setIsCalled(false);
            setModal({ id: null, type: null });
          }}
        />
      )}
      {loading && <FetchLoadingOverlay />}
      {/* 페이지 이탈 방지 모달 */}
      {modal.id === 'exit-page' && (
        <ConfirmModal
          modalText={CONFIRM_MODAL_TEXT.EXIT_PAGE}
          onConfirm={handleExitPage}
        />
      )}
    </section>
  );
}

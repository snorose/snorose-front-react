import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editReviewDetail } from '@/apis';

import { useBlocker, useToast } from '@/shared/hook';
import { ModalContext } from '@/shared/context/ModalContext';
import {
  ActionButton,
  CloseAppBar,
  Dropdown,
  FetchLoadingOverlay,
  ConfirmModal,
  Textarea,
} from '@/shared/component';
import { validClassNumber } from '@/shared/lib';
import {
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
  LECTURE_TYPES,
  SEMESTERS,
  YEARS,
} from '@/feature/exam/constant';

import styles from './EditExamReviewPage.module.css';

export default function EditExamReviewPage() {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState();
  const { modal, setModal } = useContext(ModalContext);

  const [lectureName, setLectureName] = useState(state.lectureName);
  const [professor, setProfessor] = useState(state.professor);
  const [lectureType, setLectureType] = useState(
    LECTURE_TYPES.find((type) => type.id === state.lectureType)
  );
  const [examType, setExamType] = useState(
    EXAM_TYPES.find((type) => type.id === state.examType)
  );
  const [lectureYear, setLectureYear] = useState(
    YEARS.find((year) => year.id === state.lectureYear)
  );
  const [semester, setSemester] = useState(
    SEMESTERS.find((semester) => semester.id === state.semester)
  );
  const [isPF, setIsPF] = useState(state.isPF);
  const [isOnline, setIsOnline] = useState(state.isOnline);
  const [classNumber, setClassNumber] = useState(state.classNumber);
  const [questionDetail, setQuestionDetail] = useState(state.questionDetail);

  // navigation guard
  const [isBlock, setIsBlock] = useState(false);

  useEffect(() => {
    setIsBlock(
      state.lectureName !== lectureName.trim() ||
        state.professor !== professor.trim() ||
        state.lectureType !== lectureType.id ||
        state.examType !== examType.id ||
        state.lectureYear !== lectureYear.id ||
        state.semester !== semester.id ||
        state.classNumber !== classNumber ||
        state.questionDetail !== questionDetail.trim()
    );
  }, [
    lectureName,
    professor,
    lectureType.id,
    examType.id,
    lectureYear.id,
    semester.id,
    classNumber,
    questionDetail,
  ]);

  useBlocker(isBlock);

  // 게시글 수정 중 페이지 이탈
  const handleExitPage = () => {
    setModal({
      id: null,
      type: null,
    });
    setIsBlock(false);
    navigate(-1);
  };

  const pass =
    lectureName.trim() &&
    professor.trim() &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber &&
    questionDetail.trim();

  const data = {
    isPF,
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

  const editReview = useMutation({
    mutationKey: [MUTATION_KEY.editExamReview],
    mutationFn: (edit) => editReviewDetail(postId, edit),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.post, postId]);
      navigate(-1);
      toast(TOAST.EXAM_REVIEW.edit);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return (
    <main className={styles.container}>
      <CloseAppBar>
        <ActionButton
          onClick={() => {
            setLoading(true);
            setIsBlock(false);
            editReview.mutate(data);
          }}
          disabled={!pass}
        >
          수정
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
          placeholder='강의 시험 유형 및 부가적인 설명을 기술해주세요'
          minRows='5'
          maxRows='10'
        />
      </CategoryFieldset>
      {loading && <FetchLoadingOverlay />}
      {/* 페이지 이탈 방지 모달 */}
      {modal.id === 'exit-page' && (
        <ConfirmModal
          modalText={CONFIRM_MODAL_TEXT.EXIT_PAGE}
          onConfirm={handleExitPage}
        />
      )}
    </main>
  );
}

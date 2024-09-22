import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editReviewDetail } from '@/apis';

import { useToast } from '@/hooks';

import { ActionButton, CloseAppBar } from '@/components/AppBar';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
  TextField,
} from '@/components/Fieldset';
import { InputItem, InputList } from '@/components/Input';
import { Textarea } from '@/components/Fieldset';

import { validClassNumber } from '@/utils';
import {
  EXAM_TYPES,
  LECTURE_TYPES,
  ROUTE,
  SEMESTERS,
  TOAST,
  YEARS,
} from '@/constants';

import styles from './ExamReviewEditPage.module.css';

export default function ExamReviewEditPage() {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const editReview = useMutation({
    mutationFn: (edit) => editReviewDetail(postId, edit),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewDetail', postId]);
      navigate(ROUTE.examReviewDetail(postId), { replace: true });
      toast(TOAST.EXAM_REVIEW.edit);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

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

  const pass =
    lectureName &&
    professor &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber;

  const data = {
    isPF,
    classNumber: Number(classNumber),
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
    <main className={styles.container}>
      <CloseAppBar>
        <ActionButton
          onClick={() => {
            if (!pass) {
              alert('필수입력을 모두 작성해주세요.');
            } else {
              editReview.mutate(data);
            }
          }}
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
        value={isPF}
        setFn={setIsPF}
      />
      <CategoryFieldset
        title='온라인 수업입니다'
        hasCheckbox
        value={isOnline}
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
    </main>
  );
}

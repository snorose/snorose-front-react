import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ActionButton, CloseAppBar } from '../../components/AppBar';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '../../components/Fieldset';
import { InputItem, InputList } from '../../components/Input';
import { Textarea } from '../../components/Fieldset';

import {
  CLASS_NUMBER,
  COURSE_CATEGORY,
  SEMESTERS,
  TEST_CATEGORY,
  YEARS,
} from '../../constants';

export default function ExamReviewEditPage() {
  const { state } = useLocation();

  const [lectureName, setLectureName] = useState(state.lectureName);
  const [professor, setProfessor] = useState(state.professor);
  const [lectureType, setLectureType] = useState(
    COURSE_CATEGORY.find((type) => type.id === state.lectureType)
  );
  const [examType, setExamType] = useState(
    TEST_CATEGORY.find((type) => type.id === state.examType)
  );
  const [lectureYear, setLectureYear] = useState(
    YEARS.find((year) => year.id === state.lectureYear)
  );
  const [semester, setSemester] = useState(
    SEMESTERS.find((semester) => semester.id === state.semester)
  );
  const [isPF, setIsPF] = useState(state.isPF);
  const [classNumber, setClassNumber] = useState(
    CLASS_NUMBER.find((number) => number.id === state.classNumber)
  );
  const [content, setContent] = useState(state.questionDetail);

  const pass =
    lectureName &&
    professor &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber;

  return (
    <main>
      <CloseAppBar>
        <ActionButton
          onClick={() => {
            if (!pass) {
              alert('필수입력을 모두 작성해주세요.');
            } else {
              alert('수정 완료!');
            }
          }}
        >
          수정
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
        {COURSE_CATEGORY.map((option) => (
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
        {TEST_CATEGORY.map((option) => (
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
      <CategoryFieldset title='수강 분반' required>
        <Dropdown
          options={CLASS_NUMBER}
          select={classNumber}
          setFn={setClassNumber}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='시험 유형 및 설명'>
        <Textarea
          value={content}
          setFn={setContent}
          placeholder='강의 시험 유형 및 부가적인 설명을 기술해주세요'
          minRows='5'
          maxRows='10'
        />
      </CategoryFieldset>
    </main>
  );
}

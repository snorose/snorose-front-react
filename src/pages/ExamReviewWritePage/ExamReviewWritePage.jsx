import { useState } from 'react';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '../../components/Fieldset';
import CloseAppBar from '../../components/AppBar/CloseAppBar/CloseAppBar';
import {
  CLASS_NUMBER,
  COURSE_CATEGORY,
  SEMESTERS,
  TEST_CATEGORY,
  YEARS,
} from '../../constants';
import InputList from '../../components/Input/InputList/InputList.jsx';
import InputItem from '../../components/Input/InputItem/InputItem.jsx';

export default function ExamReviewWritePage() {
  const [lectureName, setLectureName] = useState('');
  const [professor, setProfessor] = useState('');
  const [course, setCourse] = useState('');
  const [test, setTest] = useState('');
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const [classNumber, setClassNumber] = useState();

  return (
    <main>
      <CloseAppBar />
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
        {COURSE_CATEGORY.map((item) => (
          <CategoryButton
            key={item}
            select={course}
            name={item}
            callback={setCourse}
          >
            {item}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='시험 종류' required>
        {TEST_CATEGORY.map((item) => (
          <CategoryButton
            key={item}
            select={test}
            name={item}
            callback={setTest}
          >
            {item}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='수강 연도' required>
        <Dropdown
          options={YEARS}
          select={year}
          setFn={setYear}
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
        <Dropdown
          options={CLASS_NUMBER}
          select={classNumber}
          setFn={setClassNumber}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
    </main>
  );
}

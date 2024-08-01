import { useState } from 'react';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '../../components/Fieldset';
import {
  CLASS_NUMBER,
  COURSE_CATEGORY,
  SEMESTERS,
  TEST_CATEGORY,
  YEARS,
} from '../../constants';

export default function ExamReviewWritePage() {
  const [course, setCourse] = useState('');
  const [test, setTest] = useState('');
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const [classNumber, setClassNumber] = useState();

  return (
    <main>
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

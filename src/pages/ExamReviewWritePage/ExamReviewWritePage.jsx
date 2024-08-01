import { useState } from 'react';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '../../components/Fieldset';
import {
  COURSE_CATEGORY,
  SEMESTERS,
  TEST_CATEGORY,
  YEARS,
} from '../../constants';

const courses = [
  { name: COURSE_CATEGORY.requiredMajor },
  { name: COURSE_CATEGORY.major },
  { name: COURSE_CATEGORY.requiredGeneral },
  { name: COURSE_CATEGORY.general },
];
const tests = [{ name: TEST_CATEGORY.middle }, { name: TEST_CATEGORY.final }];

export default function ExamReviewWritePage() {
  const [course, setCourse] = useState('');
  const [test, setTest] = useState('');
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();

  return (
    <main>
      <CategoryFieldset title='강의 종류' required>
        {courses.map(({ name }) => (
          <CategoryButton
            key={name}
            select={course}
            name={name}
            callback={setCourse}
          >
            {name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='시험 종류' required>
        {tests.map(({ name }) => (
          <CategoryButton
            key={name}
            select={test}
            name={name}
            callback={setTest}
          >
            {name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='수강 연도' required>
        <Dropdown
          options={YEARS}
          select={year}
          setFn={setYear}
          placeholder='수강 연도를 선택해주세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='수강 학기' required>
        <Dropdown
          options={SEMESTERS}
          select={semester}
          setFn={setSemester}
          placeholder='수강 학기를 선택해주세요'
        />
      </CategoryFieldset>
    </main>
  );
}

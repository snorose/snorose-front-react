import { useState } from 'react';
import {
  CategoryButton,
  CategoryFieldset,
} from '../../components/CategoryFieldset';
import { COURSE_CATEGORY, TEST_CATEGORY } from '../../constants';

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
    </main>
  );
}

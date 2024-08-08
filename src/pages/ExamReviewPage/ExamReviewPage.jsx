import { AppBar } from '../../components/AppBar';
import { PostBar } from '../../components/PostBar';
import { PTR } from '../../components/PTR';

import { REVIEW_LIST } from '../../dummy/data';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  return (
    <main>
      <AppBar title='시험후기' />
      <PTR>
        <ul className={styles.list}>
          {REVIEW_LIST.map((post) => (
            <PostBar key={post.postId} data={post} />
          ))}
        </ul>
      </PTR>
    </main>
  );
}

import { convertHyperlink } from '@/utils';

import styles from './PostContent.module.css';

export default function PostContent({ content }) {
  return (
    <p
      className={styles.content}
      dangerouslySetInnerHTML={convertHyperlink(content)}
    ></p>
  );
}

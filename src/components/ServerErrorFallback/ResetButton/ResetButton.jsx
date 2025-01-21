import { MdOutlineReplay } from 'react-icons/md';

import styles from './ResetButton.module.css';

export default function ResetButton({ reset }) {
  return <MdOutlineReplay className={styles.retry} onClick={reset} />;
}

import { Icon } from '../Icon';

import styles from './ReviewDownload.module.css';

export default function ReviewDownload({ className, fileName }) {
  return (
    <button className={` ${styles.layout} ${className}`}>
      <Icon id='file' width='10' height='14' />
      <span>{fileName}</span>
    </button>
  );
}

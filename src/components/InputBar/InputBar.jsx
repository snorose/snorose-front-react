import { Icon } from '../../components/Icon';
import styles from './InputBar.module.css';

export default function InputBar() {
  return (
    <div className={styles.container}>
      <div className={styles.input_bar}>
        <div className={styles.profile_icon}>
          <Icon id='profile' />
        </div>
        <input
          className={styles.input_zone}
          placeholder='댓글을 입력하세요'
        ></input>
        <p className={styles.enter}>게시</p>
      </div>
    </div>
  );
}

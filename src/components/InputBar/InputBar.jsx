import { Icon } from '../../components/Icon';
import styles from './InputBar.module.css';

export default function InputBar() {
  return (
    <div className={styles.container}>
      <div className={styles.input_bar}>
        <Icon id='cloud' width='25' height='16' />
        <input
          className={styles.input_zone}
          placeholder='댓글을 입력하세요'
        ></input>
      </div>
      <div className={styles.enter}>
        <Icon id='send' width='40' height='40' />
      </div>
    </div>
  );
}

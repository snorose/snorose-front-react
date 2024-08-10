import { Icon } from '../../components/Icon';
import styles from './InputBar.module.css';

export default function InputBar() {
  return (
    <div className={styles.container}>
      <div className={styles.input_bar}>
        <Icon id='cloud' width='25' height='16' />
        <input className={styles.input_zone} placeholder='댓글을 입력하세요' />
      </div>
      <Icon
        className={styles.enter}
        id='arrow-up-right'
        width='32'
        height='32'
      />
    </div>
  );
}

import Icon from '../../components/Icon/Icon.jsx';
import styles from './CategoryBoardItem.module.css';
import { USER } from '../../dummy/data';

export default function CategoryBoardItem({ icon, name, description }) {
  if (!USER?.isLogin) {
    return <li className={styles.item}>로그인 후 이용 가능합니다.</li>;
  }

  return (
    <li className={styles.item}>
      <Icon id={icon} width={15} height={15} />
      <p className={styles.name}>{name}</p>
      <span className={styles.desc}>{description}</span>
    </li>
  );
}

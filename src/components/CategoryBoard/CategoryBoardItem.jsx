import Icon from '../../components/Icon/Icon.jsx';
import styles from './CategoryBoardItem.module.css';

export default function CategoryBoardItem({ icon, name, description }) {
  return (
    <li className={styles.item}>
      <Icon id={icon} width={15} height={15} />
      <p className={styles.name}>{name}</p>
      <span className={styles.desc}>{description}</span>
    </li>
  );
}

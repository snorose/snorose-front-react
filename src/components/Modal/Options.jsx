import styles from './Modal.module.css';
import { Icon } from '../Icon';
import { useNavigate } from 'react-router-dom';

export default function Options({ options }) {
  const navigate = useNavigate();

  const navTo = (to) => () => {
    if (to) navigate(to);
  };

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <div
          className={styles.optionBar}
          key={option.iconId}
          onClick={navTo(option.nav)}
        >
          <div className={styles.iconBox}>
            <Icon
              id={option.iconId}
              width={option.IconWidth}
              height={option.IconHeight}
            />
          </div>
          <div
            className={styles.optionText}
            style={{ color: option.color || 'inherit' }}
          >
            {option.text}
          </div>
        </div>
      ))}
    </div>
  );
}

import styles from './CategoryButton.module.css';

export default function CategoryButton({ select, option, callback, children }) {
  const handleClick = () => {
    callback(option);
  };

  return (
    <button
      className={`${styles.button} ${select === option && styles.select}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

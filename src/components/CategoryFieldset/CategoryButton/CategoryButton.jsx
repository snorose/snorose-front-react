import styles from './CategoryButton.module.css';

export default function CategoryButton({ select, name, callback, children }) {
  const handleClick = (event) => {
    const { name } = event.target;
    callback(name);
  };

  return (
    <button
      className={`${styles.button} ${select === name && styles.select}`}
      name={name}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

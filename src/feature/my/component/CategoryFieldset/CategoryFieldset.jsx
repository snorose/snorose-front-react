import styles from './CategoryFieldset.module.css';

export default function CategoryFieldset({
  title,
  hasCheckbox,
  checked,
  setFn,
  children,
}) {
  const updateCheck = (event) => {
    setFn(event.target.checked);
  };

  return (
    <div className={styles.field}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {hasCheckbox && (
          <label className={styles.check}>
            <input
              className={styles.input}
              checked={checked}
              onChange={updateCheck}
            />
          </label>
        )}
      </div>

      <div className={styles.cagetories}>{children}</div>
    </div>
  );
}

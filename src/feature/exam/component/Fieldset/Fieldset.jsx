import styles from './Fieldset.module.css';

export default function Fieldset({
  title,
  required,
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
        <span className={styles.title}>
          {title}
          {required && <span className={styles.required}></span>}
        </span>
        {hasCheckbox && (
          <label className={styles.check}>
            <input
              className={styles.input}
              type='checkbox'
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

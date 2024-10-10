import styles from './AccordionTag.module.css';

export default function AccordionTag({ admin }) {
  const { nickname, role, team, position, studentInformation } = admin;
  const roleArray = role ? [role] : [];
  const teamArray = team ?? [];

  return (
    <div className={styles.tag}>
      <div className={styles.top}>
        <span className={styles.nickname}>{nickname}</span>
        {(role || team || position) && (
          <span className={styles.title}>
            {`${[...roleArray, ...teamArray].join(', ')}`}
            {position && `(${position.join(', ')})`}
          </span>
        )}
      </div>
      <div className={styles.bottom}>
        <p className={styles.studentInfo}>{studentInformation}</p>
      </div>
    </div>
  );
}

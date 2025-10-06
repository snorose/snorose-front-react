import styles from './AppBar.module.css';

export default function AppBar({ title, backgroundColor, notFixed, children }) {
  return (
    <div
      className={styles.appBar}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        position: notFixed ? 'relative' : 'fixed',
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

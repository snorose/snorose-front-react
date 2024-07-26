import styles from './Flex.module.css';

export default function Flex({ className, direction = 'row', gap, children }) {
  return (
    <div
      className={`${styles.flex} ${className}`}
      style={{ flexDirection: direction, gap }}
    >
      {children}
    </div>
  );
}

import styles from './Url.module.css';

export default function Url({ href, children }) {
  return (
    <a
      className={styles.link}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
}

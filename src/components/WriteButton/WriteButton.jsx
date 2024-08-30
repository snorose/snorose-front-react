import { Icon } from '@/components';
import styles from './WriteButton.module.css';

export default function WriteButton({ onClick, className }) {
  return (
    <>
      <button className={`${styles.button} ${className}`} onClick={onClick}>
        <Icon id='pencil-blue' width='30' height='30' fill='#BFD7EC' />
      </button>
    </>
  );
}

import styles from './Submit.module.css';

export default function Submit({ btnName, className, ...props }) {
  return (
    <>
      <button
        className={`${styles[className]} ${styles['submitBtn']}`}
        type='submit'
        {...props}
      >
        {btnName}
      </button>
    </>
  );
}

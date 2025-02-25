import styles from './Button.module.css';

export default function Submit({ btnName, className, ...props }) {
  return (
    <>
      <button
        className={`${styles[className]} ${styles['submitBtn']}`}
        type='submit'
        onKeyDown={(e) => {
          if (className === 'ready') e.preventDefault();
        }}
        {...props}
      >
        {btnName}
      </button>
    </>
  );
}

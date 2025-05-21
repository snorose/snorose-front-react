import { Icon, PrimaryButton } from '@/shared/component';

import styles from './Accordion.module.css';

export default function Accordion({ title, children, isOpen, onClick }) {
  const goApply = () => {
    window.location.href =
      'https://www.notion.so/snorose/2024-2-10c7ef0aa3bf8027a04ee35b7c521e12';
  };

  return (
    <div className={`${styles.accordion} ${isOpen && styles.opend}`}>
      <div
        className={`${styles.panelHeader} ${title === '스노로즈 소개' ? styles.roundTop : ''} ${title === '명예의 전당' ? styles.roundBottom : ''} ${isOpen && styles.opend}`}
        onClick={onClick}
      >
        <span>{title}</span>
        <Icon
          className={styles.toggleIcon}
          id='angle-down-blue'
          width={20}
          height={20}
        />
      </div>
      <div
        className={`${styles.panelBody} ${title === '명예의 전당' ? styles.roundBottom : ''}`}
      >
        {children}
      </div>
      {title === '명예의 전당' && isOpen && (
        <PrimaryButton
          className={styles.apply}
          // onClick={() => alert('지원 기간이 아닙니다!')}
          onClick={goApply}
        >
          리자 지원하기
        </PrimaryButton>
      )}
    </div>
  );
}

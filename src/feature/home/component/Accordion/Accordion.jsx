import { Icon, PrimaryButton } from '@/shared/component';

import styles from './Accordion.module.css';

const goApply = () => {
  window.location.href =
    'https://www.notion.so/snorose/2024-2-10c7ef0aa3bf8027a04ee35b7c521e12';
};

export default function Accordion({ title, children, isOpen, onClick }) {
  return (
    <div className={`${styles.accordion} ${isOpen && styles.opend}`}>
      <div className={`${styles.panelHeader}`} onClick={onClick}>
        <span>{title}</span>
        <Icon
          className={styles.toggleIcon}
          id='angle-down-blue'
          width={16}
          height={16}
        />
      </div>
      <div className={`${styles.panelBody}`}>{children}</div>
      {title === '명예의 전당' && isOpen && (
        <PrimaryButton
          className={styles.apply}
          // onClick={() => alert('지원 기간이 아닙니다!')}
          onClick={goApply}
        >
          지난 모집 공고 확인하기
        </PrimaryButton>
      )}
    </div>
  );
}

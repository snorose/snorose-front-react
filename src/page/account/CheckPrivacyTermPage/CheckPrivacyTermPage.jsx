import { BackAppBar, Button } from '@/shared/component';
import styles from './CheckPrivacyTermPage.module.css';
import { PRIVACY_TERM } from '@/feature/account/constant/privacyTerm';
import { useEffect, useRef, useState } from 'react';

export default function CheckPrivacyTermPage() {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const descriptionRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // 스크롤이 끝에 도달했는지 확인 (약간의 여유값 추가)
    const isAtEnd = scrollTop + clientHeight >= scrollHeight - 5;
    setIsScrolledToEnd(isAtEnd);
  };

  // 컨텐츠가 스크롤 없이도 모두 보이는 경우 처리
  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      if (scrollHeight <= clientHeight) {
        setIsScrolledToEnd(true);
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      <BackAppBar notFixed />
      <div className={styles.body}>
        <div className={styles.title}>
          {PRIVACY_TERM.title}
          <div className={styles.required} />
        </div>
        <div
          className={styles.description}
          ref={descriptionRef}
          onScroll={handleScroll}
        >
          <div className={styles.summary}>{PRIVACY_TERM.summary}</div>
          <div className={styles.guide}>{PRIVACY_TERM.guide}</div>
          {PRIVACY_TERM.details.map((section, idx) => (
            <div key={idx} className={styles.details}>
              <div className={styles.subtitle}>{section.title}</div>
              <div className={styles.content}>{section.content}</div>
            </div>
          ))}
          <div className={styles.notice}>{PRIVACY_TERM.notice}</div>
        </div>
        <div className={styles.submit}>
          <Button
            btnName='동의하고 계속하기'
            className={isScrolledToEnd ? 'right' : 'ready'}
            disabled={!isScrolledToEnd}
          />
        </div>
      </div>
    </main>
  );
}

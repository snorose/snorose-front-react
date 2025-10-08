import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackAppBar, Button } from '@/shared/component';

import { PRIVACY_TERM } from '@/feature/account/constant/privacyTerm';

import styles from './CheckPrivacyTermPage.module.css';

export default function CheckPrivacyTermPage() {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const descriptionRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (e) => {
    // 이미 한 번 끝까지 스크롤했다면 더 이상 확인하지 않음
    if (hasScrolledToEnd) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // 스크롤이 끝에 도달했는지 확인 (약간의 여유값 추가)
    const isAtEnd = scrollTop + clientHeight >= scrollHeight - 5;

    if (isAtEnd) {
      setHasScrolledToEnd(true);
    }
  };

  // 컨텐츠가 스크롤 없이도 모두 보이는 경우 처리
  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      if (scrollHeight <= clientHeight) {
        setHasScrolledToEnd(true);
      }
    }
  }, []);

  const handleAgree = () => {
    // window 객체에 임시로 상태 저장
    window.privacyTermsAgreed = true;

    // 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('privacyTermsAgreed'));

    navigate(-1);
  };

  return (
    <div className={styles.container}>
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
            className={hasScrolledToEnd ? 'right' : 'ready'}
            disabled={!hasScrolledToEnd}
            onClick={handleAgree}
          />
        </div>
      </div>
    </div>
  );
}

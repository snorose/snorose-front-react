import { useEffect, useRef } from 'react';
import { Icon } from '../../../components/Icon';
import styles from './ViewPointListPage.module.css';
import { BackAppBar } from '../../../components/AppBar';

export default function ViewPointListPage() {
  const chargePointsRef = useRef([]);

  useEffect(() => {
    chargePointsRef.current.forEach((point) => {
      const value = point.textContent.replace(/\s/g, '');
      if (parseInt(value) < 0) {
        point.classList.add(styles.negative);
      }
    });
  }, []);

  return (
    <main className={styles.viewPointListPage}>
      <header>
        <BackAppBar stroke='#000' />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>보유 포인트</h1>
          <div className={styles.totalPointWrapper}>
            <Icon id='point-circle' />
            <span className={styles.totalPoint}>39</span>
          </div>
        </div>

        <article className={styles.pointListContainer}>
          <section className={styles.pointBox}>
            <div className={styles.pointIconContentWrapper}>
              <Icon id='heart-plus' />
              <div className={styles.pointContent}>
                <h2 className={styles.pointTitle}>출석 포인트</h2>
                <time className={styles.pointDate}>2024.06.01 15:23:00</time>
              </div>
            </div>
            <span className={styles.chargePoint}>+ 3</span>
          </section>
        </article>
      </section>
    </main>
  );
}

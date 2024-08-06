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
      <BackAppBar stroke='#000' />
      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>보유 포인트</h1>
          <div className={styles.totalPointWrapper}>
            <Icon id='point-circle' />
            <span className={styles.totalPoint}>39</span>
          </div>
        </div>

        <div className={styles.pointListContainer}>
          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-plus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>출석 포인트</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>+ 3</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-plus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>게시글 포인트</div>
                <div className={styles.pointDesc}>뫔뫄</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>+ 3</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-plus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>댓글 포인트</div>
                <div className={styles.pointDesc}>
                  어제 간식으로 나온거 맛있던데 총학 공지에 나와있는...
                </div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>+ 2</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-minus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>시험후기 다운로드</div>
                <div className={styles.pointDesc}>서양미술사/이교수</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>- 50</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-plus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>인증 포인트</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>+ 50</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-plus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>신고 포상 포인트</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>+ 10</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-minus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>게시글 삭제 포인트</div>
                <div className={styles.pointDesc}>아미친 지각 각임</div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>- 3</p>
            </div>
          </div>

          <div className={styles.pointBox}>
            <div className={styles.pointWrapper}>
              <div className={styles.pointIconWrapper}>
                <Icon id='heart-minus' className={styles.icon} />
              </div>
              <div className={styles.pointContent}>
                <div className={styles.pointTitle}>댓글 삭제 포인트</div>
                <div className={styles.pointDesc}>
                  어제 간식으로 나온거 맛있던데 총학 공지에 나와있는...
                </div>
                <div className={styles.pointDate}>2024.06.01 15:23:00</div>
              </div>
            </div>
            <div className={styles.pointScore}>
              <p className={styles.chargePoint}>- 3</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

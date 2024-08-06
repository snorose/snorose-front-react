import { useEffect, useRef } from 'react';
import { Icon } from '../../../components/Icon';
import styles from './ViewPointListPage.module.css';
import { BackAppBar } from '../../../components/AppBar';

const pointData = [
  {
    id: 1,
    title: '출석 포인트',
    desc: '',
    date: '2024.06.01 15:23:00',
    point: 2,
  },
  {
    id: 2,
    title: '게시글 포인트',
    desc: '뫔뫄',
    date: '2024.06.01 15:23:00',
    point: 3,
  },
  {
    id: 3,
    title: '댓글 포인트',
    desc: '어제 간식으로 나온거 맛있던데 총학 공지에 나와있는...',
    date: '2024.06.01 15:23:00',
    point: 1,
  },
  {
    id: 4,
    title: '시험후기 다운로드',
    desc: '서양미술사/이교수',
    date: '2024.06.01 15:23:00',
    point: -50,
  },
  {
    id: 5,
    title: '인증 포인트',
    desc: '',
    date: '2024.06.01 15:23:00',
    point: 50,
  },
  {
    id: 6,
    title: '신고 포상 포인트',
    desc: '',
    date: '2024.06.01 15:23:00',
    point: 10,
  },
  {
    id: 7,
    title: '게시글 삭제 포인트',
    desc: '아 미친 지각 각임',
    date: '2024.06.01 15:23:00',
    point: -3,
  },
  {
    id: 8,
    title: '댓글 삭제 포인트',
    desc: '어제 간식으로 나온거 맛있던데 총학 공지에 나와있는...',
    date: '2024.06.01 15:23:00',
    point: -3,
  },
];

export default function ViewPointListPage() {
  const chargePointsRef = useRef([]);

  useEffect(() => {
    chargePointsRef.current.forEach((point) => {
      const value = point.textContent.replace(/\s/g, '');
      if (parseInt(value) < 0) {
        point.classList.add(styles.negative);

        const pointTitleElement = point
          .closest(`.${styles.pointBox}`)
          .querySelector(`.${styles.pointTitle}`);
        if (pointTitleElement) {
          pointTitleElement.classList.add(styles.negative);
        }
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
          {pointData.map((item, index) => (
            <section key={item.id} className={styles.pointBox}>
              <div className={styles.pointIconContentWrapper}>
                <Icon id={item.point > 0 ? 'heart-plus' : 'heart-minus'} />
                <div className={styles.pointContent}>
                  <h2 className={styles.pointTitle}>{item.title}</h2>
                  {item.desc && <p className={styles.pointDesc}>{item.desc}</p>}
                  <time className={styles.pointDate}>{item.date}</time>
                </div>
              </div>
              <span
                ref={(el) => (chargePointsRef.current[index] = el)}
                className={styles.chargePoint}
              >
                {item.point > 0 ? `+${item.point}` : `${item.point}`}
              </span>
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}

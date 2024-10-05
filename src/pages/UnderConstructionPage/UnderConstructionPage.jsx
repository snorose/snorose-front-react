import { Icon } from '@/components/Icon';

import { FaInstagram } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

import styles from './UnderConstructionPage.module.css';

export default function UnderConstructionPage() {
  return (
    <main className={styles.main}>
      <div className={styles.logoOverlay}></div>
      <h1 className={styles.title}>🚧 현재 공사중 🚧</h1>
      <p className={styles.description}>
        현재 <b>[스노로즈 리뉴얼 중]</b>입니다.
        <br />
        양해 부탁드립니다.
      </p>
      <ul className={styles.list}>
        <li>■ 사이트 운영 중단 기간: 2024.08.24(토) ~ 2024.10.12(토)</li>
        <li>■ 리뉴얼 오픈 일시 : 2024.10.12(토)</li>
        <li>■ 문의 창구: snorose1906@gmail.com</li>
      </ul>
      <div className={styles.bottom}>
        <Icon id='cloud' width='30px' height='18px' />
        <p className={styles.thanks}>감사합니다.</p>
      </div>
      <div className={styles.links}>
        <a className={styles.icon} href='https://www.instagram.com/snorose1906'>
          <FaInstagram />
        </a>
        <a className={styles.icon} href='mailto:snorose1906@gmail.com'>
          <IoMail />
        </a>
      </div>
    </main>
  );
}

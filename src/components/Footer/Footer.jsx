import { Icon } from '@/components/Icon';

import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Icon id='logo' width={109} height={20} />
      <div className={styles.info}>
        <p>
          {'CONTACT US : '}
          <a href='mailto:smsnorose@gmail.com'>snorose1906@gmail.com</a>
        </p>
        <p>후원하기 : 카카오뱅크 3333-31-8162062 (예금주: 김*지)</p>
        <div className={styles.menu}>
          <Link to='/my-page/service-policy' className={styles.link}>
            <span>서비스 이용 약관</span>
          </Link>
          <Link
            to='https://www.notion.so/snorose/1147ef0aa3bf8039add2e00a4edd0eb4'
            target='_blank'
            className={styles.link}
          >
            <span>배너 및 광고 문의</span>
          </Link>
          <Link to='/my-page/privacy-policy' className={styles.link}>
            <span>개인정보 처리방침</span>
          </Link>
          <Link
            to='https://www.instagram.com/snorose1906/'
            target='_blank'
            className={styles.link}
          >
            <Icon id='instagram' width={16.5} height={16.5} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

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
          <a href='mailto:smsnorose@gmail.com'>smsnorose@gmail.com</a>
        </p>
        <p>숙명여대 후원하기 : 신한 110-123-123123</p>
        <div className={styles.menu}>
          <Link to='/my-page/service-policy'>
            <span>서비스 이용 약관</span>
          </Link>
          |<span>배너 및 광고 문의</span>|
          <Link to='/my-page/privacy-policy'>
            <span>개인정보 처리방침</span>
          </Link>
          |
          <Link to='https://www.instagram.com/snorose1906/' target='_blank'>
            <Icon id='instagram' width={16.5} height={16.5} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

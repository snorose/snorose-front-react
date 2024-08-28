import { Icon } from '@/components/Icon';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Icon id='logo' width={109} height={20} />
      <div className={styles.info}>
        <p className={styles.contact}>CONTACT US : smsnorose@gmail.com</p>
        <p className={styles.give}>숙명여대 후원하기 : 신한 110-123-123123</p>
        <div className={styles.menu}>
          <span>이용 약관</span>|<span>배너 및 광고 문의</span>|
          <span>개인정보 처리방침</span>|
          <Icon id='instagram' width={16.5} height={16.5} />
        </div>
      </div>
    </footer>
  );
}

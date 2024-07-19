import Icon from '../Icon/Icon.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>SNOROSE</p>
      <p>CONTACT US : smsnorose@gmail.com</p>
      <p>숙명여대 후원하기 : 신한 110-123-123123</p>
      <p className={styles.info}>
        <span>이용 약관</span>|<span>배너 및 광고 문의</span>|
        <span>개인정보 처리방침</span>|
        <Icon id='insta' width={11} height={11} />
      </p>
    </footer>
  );
}

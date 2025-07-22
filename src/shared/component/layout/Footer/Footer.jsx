import { Link } from 'react-router-dom';

import { Icon } from '@/shared/component';

import style from './Footer.module.css';

export default function Footer() {
  const textToCopy = '카카오뱅크 3333-31-8162062';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('복사 완료:)');
      })
      .catch((error) => {
        alert('복사 실패ㅜ.ㅜ');
      });
  };

  return (
    <footer className={style.footer}>
      <Icon id='logo' width={118} height={21} />

      <div className={style.info}>
        <p>
          <span className={style.bold}>CONTACT US </span>
          <a href='mailto:snorose1906@gmail.com'>snorose1906@gmail.com</a>
        </p>
        <p>
          <span className={style.bold}>숙명여대 후원하기</span>{' '}
          <span onClick={handleCopy} className={style.accountNumber}>
            {textToCopy}
          </span>{' '}
          (예금주: 김*지)
        </p>
      </div>

      <div className={style.menu}>
        <Link to='/my-page/service-policy' className={style.link}>
          서비스 이용 약관
        </Link>
        {' | '}
        <Link
          to='https://www.notion.so/snorose/1147ef0aa3bf8039add2e00a4edd0eb4'
          target='_blank'
          className={style.link}
        >
          배너 및 광고 문의
        </Link>{' '}
        {' | '}
        <Link to='/my-page/privacy-policy' className={style.link}>
          개인정보 처리방침
        </Link>{' '}
        {' | '}
        <Link
          to='https://www.instagram.com/snorose1906/'
          target='_blank'
          className={style.link}
        >
          <Icon id='instagram' width={16.5} height={16.5} />
        </Link>
      </div>
    </footer>
  );
}

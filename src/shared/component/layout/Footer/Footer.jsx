import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import { Icon } from '@/shared/component';
import { FOOTER_MENUS, TOAST } from '@/shared/constant';
import { useToast } from '@/shared/hook';

import style from './Footer.module.css';

export default function Footer() {
  const { toast } = useToast();
  const textToCopy = '카카오뱅크 3333-31-8162062';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast(TOAST.COPY_AND_PASTE.SUCCESS);
      })
      .catch((error) => {
        toast(TOAST.COPY_AND_PASTE.FAIL);
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
        {FOOTER_MENUS.map(({ title, to }) => (
          <Fragment key={title}>
            <Link to={to} target='_blank'>
              {title}
            </Link>
            <span className={style.separator}> | </span>
          </Fragment>
        ))}
        <Link to='https://www.instagram.com/snorose1906/' target='_blank'>
          <Icon id='instagram' width={16.5} height={16.5} />
        </Link>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import { Icon } from '@/shared/component';
import { FOOTER_MENUS } from '@/shared/constant';

import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <Icon id='logo' width={118} height={21} />

      <div className={style.info}>
        <p>
          <span className={style.bold}>CONTACT US </span>
          <a href='mailto:snorose1906@gmail.com'>snorose1906@gmail.com</a>
        </p>
        <p>
          <span className={style.bold}>숙명여대 후원하기</span> 카카오뱅크
          3333-31-8162062 (예금주: 김*지)
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

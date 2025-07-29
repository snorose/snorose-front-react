import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import { Icon } from '@/shared/component';
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_MENUS,
  FOOTER_SNS_LINKS,
  TOAST,
} from '@/shared/constant';
import { useToast } from '@/shared/hook';

import style from './Footer.module.css';

export default function Footer() {
  const { toast } = useToast();

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({ message: TOAST.COPY_AND_PASTE.SUCCESS });
      })
      .catch(() => {
        toast({ message: TOAST.COPY_AND_PASTE.FAIL, type: 'error' });
      });
  };

  return (
    <footer className={style.footer}>
      <Icon id='logo' width={118} height={21} />

      <div className={style.info}>
        {FOOTER_CONTACT_ITEMS.map(({ type, label, value, accountHolder }) => (
          <p key={type}>
            <span className={style.bold}>{label}</span>{' '}
            <span
              onClick={() => handleCopy(value)}
              className={style.accountNumber}
            >
              {value}
            </span>{' '}
            {accountHolder}
          </p>
        ))}
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

        {FOOTER_SNS_LINKS.map(({ id, iconId, to }) => (
          <Link key={id} to={to} target='_blank'>
            <Icon id={iconId} width={16.5} height={16.5} />
          </Link>
        ))}
      </div>
    </footer>
  );
}

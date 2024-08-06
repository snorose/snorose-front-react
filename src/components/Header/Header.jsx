import { Icon } from '../../components/Icon';
import { MenuIcon } from '../MenuIcon';
import styles from './Header.module.css';

export default function Header({ className }) {
  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <Icon id='logo' width={151} height={27} />
        <MenuIcon />
      </header>
    </>
  );
}

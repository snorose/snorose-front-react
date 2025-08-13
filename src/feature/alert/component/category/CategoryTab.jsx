import style from './CategoryTab.module.css';

export default function CategoryTab({ name }) {
  return <button className={style.tabButton}>{name}</button>;
}

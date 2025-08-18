import style from './NotificationItem.module.css';

export default function NotificationItem({
  title,
  content,
  category,
  createdAt,
  isRead = false,
  url,
}) {
  return (
    <div className={`${style.container} ${isRead ? style.read : style.unread}`}>
      <div className={style.top}>
        <div>
          <div className={style.title}>{title}</div>
          <Chip category={category} />
        </div>
        <div className={style.createdAt}>{createdAt}</div>
      </div>

      <div className={style.bottom}>
        <div className={style.content}>{content}</div>
      </div>
    </div>
  );
}

function Chip({ category }) {
  return <div className={style.category}>{category}</div>;
}

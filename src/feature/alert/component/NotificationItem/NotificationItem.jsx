import { GradientBox } from '@/shared/component';

import style from './NotificationItem.module.css';

export default function NotificationItem({
  title,
  content,
  category,
  dateTime,
  isRead,
}) {
  return (
    <GradientBox className={`${style.gray} ${style.pink}`}>
      <div className={style.container}>
        <div className={style.top}>
          <div>
            <div className={style.title}>{title}</div>
            <Tag category={category} />
            <div className={style.category}>{category}</div>
          </div>
          <div className={style.time}>{dateTime}</div>
        </div>

        <div className={style.bottom}>
          <div className={style.content}>{content}</div>
        </div>
      </div>
    </GradientBox>
  );
}

function Tag({ category }) {
  return <div className={style.category}>{category}</div>;
}

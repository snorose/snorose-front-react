import { CATEGORY } from '@/feature/alert/constant';

export function toNotificationItem({
  id,
  title,
  body,
  isRead,
  createdAt,
  url,
  filter,
}) {
  return {
    id,
    title,
    content: body,
    isRead,
    createdAt: formatToKST_MMDD_HHMM(createdAt),
    url,
    category: CATEGORY[filter],
  };
}

function formatToKST_MMDD_HHMM(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';

  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .formatToParts(d)
    .reduce((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});

  return `${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
}

// 알림 수신 설정 다음 상태값 계산
export function calculateNextNotificationSettings({ current, type }) {
  switch (type.toUpperCase()) {
    case 'REQUIRED': {
      const next = !current.required;

      return {
        required: next,
        marketing: next ? current.marketing : false,
        attendance: next ? current.attendance : false,
      };
    }

    case 'MARKETING': {
      if (!current.required) return current;

      return {
        ...current,
        marketing: !current.marketing,
      };
    }

    case 'ATTENDANCE': {
      if (!current.required) return current;

      return {
        ...current,
        attendance: !current.attendance,
      };
    }

    default:
      return current;
  }
}

export class DateTime {
  private static readonly MINUTE_SECONDS = 60;
  private static readonly HOUR_SECONDS = DateTime.MINUTE_SECONDS * 60;
  private static readonly DAY_SECONDS = DateTime.HOUR_SECONDS * 24;
  private static readonly MONTH_SECONDS = DateTime.DAY_SECONDS * 30;
  private static readonly YEAR_SECONDS = DateTime.DAY_SECONDS * 365;
  private static WEEKDAY_KO = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
  ] as const;

  private static pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  static format(
    date: Date,
    format: 'ISO' | 'YMD_HM' | 'YMD' | 'YMD_D' | 'MD_HM' | 'HM'
  ): string {
    const yyyy = date.getFullYear();
    const mm = DateTime.pad(date.getMonth() + 1);
    const dd = DateTime.pad(date.getDate());
    const HH = DateTime.pad(date.getHours());
    const min = DateTime.pad(date.getMinutes());
    const ss = DateTime.pad(date.getSeconds());
    const day = date.getDay();

    switch (format) {
      case 'ISO':
        return `${yyyy}-${mm}-${dd}T${HH}:${min}:${ss}`;
      case 'YMD_HM':
        return `${yyyy}/${mm}/${dd} ${HH}:${min}`;
      case 'YMD':
        return `${yyyy}/${mm}/${dd}`;
      case 'YMD_D':
        return `${yyyy}/${mm}/${dd} (${DateTime.WEEKDAY_KO[day]})`;
      case 'MD_HM':
        return `${mm}/${dd} ${HH}:${min}`;
      case 'HM':
        return `${HH}:${min}`;
    }
  }

  /**
   * same day: time ago or HH:MM
   * same year: MM/DD HH:MM
   * other year: YYYY/MM/DD HH:MM
   */
  static formatAdaptive(date: Date): string {
    const now = new Date();

    if (DateTime.isToday(date)) {
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      return diffInSeconds < DateTime.HOUR_SECONDS
        ? DateTime.timeAgo(date)
        : DateTime.format(date, 'HM');
    }

    return date.getFullYear() === now.getFullYear()
      ? DateTime.format(date, 'MD_HM')
      : DateTime.format(date, 'YMD_HM');
  }

  static timeAgo(date: Date): string {
    const now = new Date();
    let seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 0) seconds = 0; // 미래 들어오는 경우 방어

    if (seconds < DateTime.MINUTE_SECONDS) {
      return '방금 전';
    } else if (seconds < DateTime.HOUR_SECONDS) {
      const minutes = Math.floor(seconds / DateTime.MINUTE_SECONDS);
      return `${minutes}분 전`;
    } else if (seconds < DateTime.DAY_SECONDS) {
      const hours = Math.floor(seconds / DateTime.HOUR_SECONDS);
      return `${hours}시간 전`;
    } else if (seconds < DateTime.MONTH_SECONDS) {
      const days = Math.floor(seconds / DateTime.DAY_SECONDS);
      return `${days}일 전`;
    } else if (seconds < DateTime.YEAR_SECONDS) {
      const months = Math.floor(seconds / DateTime.MONTH_SECONDS);
      return `${months}달 전`;
    } else {
      const years = Math.floor(seconds / DateTime.YEAR_SECONDS);
      return `${years}년 전`;
    }
  }

  static isToday(date: Date): boolean {
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  static isDayOver(date: Date): boolean {
    const today = new Date();

    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return d < t;
  }
}

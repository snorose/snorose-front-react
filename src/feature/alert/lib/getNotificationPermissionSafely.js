export async function getNotificationPermissionSafely() {
  const current = Notification.permission;

  if (current === 'granted') return true;
  if (current === 'denied') {
    console.warn('알림 권한 거부됨');
    return false;
  }

  const result = await Notification.requestPermission();
  return result === 'granted';
}

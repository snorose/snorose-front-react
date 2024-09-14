const MOBBILE_DEVICES = Object.freeze([
  'Android',
  'iPhone',
  'iPad',
  'iPod',
  'BlackBerry',
  'Windows Phone',
  'Mobile',
]);

export const isPC = () => {
  if (navigator.userAgentData) {
    return !navigator.userAgentData.mobile;
  }

  const userAgent = navigator.userAgent;
  const isMobileDevice = MOBBILE_DEVICES.some((device) =>
    userAgent.includes(device)
  );

  return !isMobileDevice && window.innerWidth > 1024;
};

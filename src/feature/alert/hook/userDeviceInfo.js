// hooks/useDeviceInfo.js
import { useState, useEffect } from 'react';

const useDeviceInfo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      console.log(ua);

      const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      const android = /Android/i.test(ua);
      const ios = /iPhone|iPad|iPod/i.test(ua);

      setIsMobile(mobile);
      setIsAndroid(android);
      setIsIOS(ios);
    }
  }, []);

  return { isMobile, isAndroid, isIOS };
};

export default useDeviceInfo;

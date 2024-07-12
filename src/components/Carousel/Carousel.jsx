import { useRef, useEffect, useState } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({ children }) {
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      if (currentIndex + 1 === children.length) {
        setCurrentIndex(0);
        carouselRef.current.style.transform = `translateX(0)`;
      } else {
        setCurrentIndex((prev) => prev + 1);
        carouselRef.current.style.transform = `translateX(calc(-1 * (100% - 14px) * ${currentIndex + 1}))`;
      }
    }, 5000);

    return () => clearInterval(carouselTimer);
  }, [children.length, currentIndex]);

  return (
    <div>
      <div ref={carouselRef} className={styles.carousel}>
        {children}
      </div>
      <div className={styles.indicator}>
        {Array.from({ length: children.length }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex && styles.current}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

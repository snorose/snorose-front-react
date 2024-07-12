import Carousel from '../../components/Carousel/Carousel.jsx';
import Header from '../../components/Header/Header';
import Notice from '../../components/Notice/Notice.jsx';
import Slide from '../../components/Carousel/Slide.jsx';
import BANNER1 from '../../assets/images/ad_banner1.png';
import BANNER2 from '../../assets/images/ad_banner2.png';
import BANNER3 from '../../assets/images/ad_banner3.png';

export default function MainPage() {
  return (
    <main>
      <Header />
      <Carousel>
        <Slide src={BANNER1} alt='banner1' />
        <Slide src={BANNER2} alt='banner2' />
        <Slide src={BANNER3} alt='banner3' />
      </Carousel>
      <Notice />
      메인홈
    </main>
  );
}

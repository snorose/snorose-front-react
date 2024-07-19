import Carousel from '../../components/Carousel/Carousel.jsx';
import CategoryBoard from '../../components/CategoryBoard/CategoryBoard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header';
import Notice from '../../components/Notice/Notice.jsx';
import Slide from '../../components/Carousel/Slide.jsx';
import { BESOOKTS } from '../../dummy/besookt.js';
import { BOARDMENUS } from '../../constants/boardmenus.js';
import BANNER1 from '../../assets/images/ad_banner1.png';
import BANNER2 from '../../assets/images/ad_banner2.png';
import BANNER3 from '../../assets/images/ad_banner3.png';

const BOARDS = BOARDMENUS.filter((board) => board.title !== '베숙트');

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
      <CategoryBoard title='카테고리'>
        {BOARDS.map(({ id, title, desc }) => (
          <CategoryBoard.Item
            key={id}
            icon={id}
            name={title}
            description={desc}
          />
        ))}
      </CategoryBoard>
      {BESOOKTS.length > 0 && (
        <CategoryBoard title='베숙트'>
          {BESOOKTS.map(
            ({
              postId,
              nickname,
              title,
              overview,
              boardName,
              timeAgo,
              image,
            }) => (
              <CategoryBoard.DetailItem
                key={postId}
                nickname={nickname}
                title={title}
                overview={overview}
                boardName={boardName}
                timeAgo={timeAgo}
                image={image}
              />
            )
          )}
        </CategoryBoard>
      )}
      <Footer />
    </main>
  );
}

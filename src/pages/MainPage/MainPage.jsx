import Carousel from '../../components/Carousel/Carousel.jsx';
import CategoryBoard from '../../components/CategoryBoard/CategoryBoard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header';
import Notice from '../../components/Notice/Notice.jsx';
import Slide from '../../components/Carousel/Slide.jsx';
import { BESOOKTS, CAROUSEL_BANNER } from '../../dummy/data';
import { BOARDMENUS } from '../../constants/boardmenus.js';

const BOARDS = BOARDMENUS.filter((board) => board.title !== '베숙트');

export default function MainPage() {
  return (
    <main>
      <Header />
      <Carousel>
        {CAROUSEL_BANNER.map((banner) => (
          <Slide src={banner} alt='banner' />
        ))}
      </Carousel>
      <Notice />
      <CategoryBoard title='카테고리' to='/board'>
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
        <CategoryBoard title='베숙트' to='/board/besookt'>
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

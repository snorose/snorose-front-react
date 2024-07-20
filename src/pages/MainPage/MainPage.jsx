import Card from '../../components/Card/Card.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import CategoryBoard from '../../components/CategoryBoard/CategoryBoard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header';
import Margin from '../../components/Margin/Margin.jsx';
import Slide from '../../components/Carousel/Slide.jsx';
import { BESOOKTS, CAROUSEL_BANNER, USER } from '../../dummy/data';
import { BOARDMENUS } from '../../constants/boardmenus.js';
import styles from './MainPage.module.css';

const BOARDS = BOARDMENUS.filter((board) => board.title !== '베숙트');

export default function MainPage() {
  return (
    <main>
      <Header />
      <Carousel>
        {CAROUSEL_BANNER.map((banner, index) => (
          <Slide key={index} src={banner} alt='banner' />
        ))}
      </Carousel>
      <Margin className={styles.cards}>
        <Card
          className={styles.notice}
          to='/notice'
          title='시험후기 등록 기간 공지'
          tag='공지'
          imgPath='megaphone.svg'
          icon={{ id: 'megaphone', width: 128, height: 131 }}
          isDark={USER?.isLogin ? false : true}
        />
        {USER?.isLogin && (
          <Card
            className={styles.mark}
            to='/'
            title='오늘의 출석체크'
            tag='출석체크'
            imgPath='flag.svg'
            icon={{ id: 'flag', width: 85, height: 101 }}
            isDark
          />
        )}
      </Margin>
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

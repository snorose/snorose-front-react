import Card from '../../components/Card/Card.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header';
import MainPageListItem from '../../components/MainPageListItem/MainPageListItem.jsx';
import Margin from '../../components/Margin/Margin.jsx';
import Slide from '../../components/Carousel/Slide.jsx';
import { BESOOKTS, CAROUSEL_BANNER, USER } from '../../dummy/data';
import { BOARDMENUS, ROLE } from '../../constants';
import styles from './MainPage.module.css';
import BoardCard from '../../components/BoardCard/BoardCard.jsx';
import Flex from '../../components/Flex/Flex.jsx';
import ListHeader from '../../components/ListHeader/ListHeader.jsx';

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
      <Margin className={styles.community}>
        <ListHeader to='/board' title='커뮤니티' />
        <Flex gap='0.625rem'>
          {BOARDS.map((board) => (
            <BoardCard
              key={board.id}
              to={board.to}
              name={board.title}
              desc={board.desc}
              backgroundImage={board.image}
            />
          ))}
        </Flex>
      </Margin>
      {BESOOKTS.length > 0 && (
        <Margin className={styles.besookt}>
          <ListHeader to='/board/besookt' title='베숙트' />
          <Flex direction='column' gap='0.375rem'>
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
                <MainPageListItem
                  key={postId}
                  postId={postId}
                  displayName={nickname}
                  title={title}
                  overview={overview}
                  boardName={boardName}
                  createdAt={timeAgo}
                  image={image}
                  roles={[ROLE.user, ROLE.user2, ROLE.admin, ROLE.official]}
                />
              )
            )}
          </Flex>
        </Margin>
      )}
      <Footer />
    </main>
  );
}

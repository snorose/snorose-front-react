import {
  BoardCard,
  Card,
  Carousel,
  Footer,
  Header,
  ListHeader,
  MainPageListItem,
  Margin,
  Slide,
  Flex,
} from '@/components';

import { BOARD_MENUS, ROLE } from '@/constants';
import { BESOOKTS, CAROUSEL_BANNER, USER } from '@/dummy/data';

import styles from './MainPage.module.css';

const BOARDS = BOARD_MENUS.filter((board) => [21, 22, 23].includes(board.id));

export default function MainPage() {
  return (
    <main>
      <Header className={styles.header} />
      <Carousel>
        {CAROUSEL_BANNER.map((banner, index) => (
          <Slide key={index} src={banner} alt='banner' />
        ))}
      </Carousel>
      <Margin className={styles.cards}>
        <Flex gap='0.45rem'>
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
              to='/attendance'
              title='오늘의 출석체크'
              tag='출석체크'
              imgPath='flag.svg'
              icon={{ id: 'flag', width: 85, height: 101 }}
              isDark
            />
          )}
        </Flex>
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
      {/* {BESOOKTS.length > 0 && (
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
      )} */}
      <Footer />
    </main>
  );
}

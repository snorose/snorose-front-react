import { useQuery } from '@tanstack/react-query';

import { getBannerImage, getHomeNotice } from '@/apis';

import { useAuth, usePopUp } from '@/hooks';

import {
  BoardCard,
  Card,
  Carousel,
  Flex,
  Footer,
  Header,
  ListHeader,
  MainPageListItem,
  Margin,
  PopUp,
} from '@/components';

import { BOARD_MENUS, QUERY_KEY, ROLE } from '@/constants';
import { BESOOKTS } from '@/dummy/data';

import styles from './MainPage.module.css';

const BOARDS = BOARD_MENUS.filter((board) => [21, 22, 23].includes(board.id));

export default function MainPage() {
  const { status } = useAuth();
  const { isPopUpOpend, closePopUp } = usePopUp();
  const isLogin = status === 'authenticated';

  const { data: slides, isError: slidesIsError } = useQuery({
    queryKey: [QUERY_KEY.banner],
    queryFn: () => getBannerImage(),
    gcTime: Infinity,
    staleTime: 1000 * 60 * 5,
  });

  const { data: notice, isError: noticeIsError } = useQuery({
    queryKey: [QUERY_KEY.homeNotice],
    queryFn: () => getHomeNotice(),
    staleTime: 1000 * 60 * 5,
  });

  if (!slides || slidesIsError || !notice || noticeIsError) {
    return null;
  }

  return (
    <main>
      <Header className={styles.header} />
      <Carousel slides={slides ?? []} delay={3000} />
      <Margin className={styles.cards}>
        <Flex gap='0.45rem'>
          <Card
            className={styles.notice}
            to='/board/notice'
            title={notice.title}
            tag='공지'
            icon={{
              id: isLogin ? 'blueMegaphone' : 'megaphone',
              mixBlendMode: isLogin ? 'color-burn' : 'luminosity',
              rotate: isLogin ? -34.271 : 34.27,
            }}
            isDark={isLogin ? false : true}
          />

          {isLogin && (
            <Card
              className={styles.mark}
              to='/attendance'
              title={`오늘의\n출석체크`}
              tag='출석체크'
              icon={{ id: 'flag', mixBlendMode: 'luminosity' }}
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
      {isPopUpOpend && <PopUp close={closePopUp} />}
    </main>
  );
}

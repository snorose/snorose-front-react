import { useQuery } from '@tanstack/react-query';

import { getBannerImage, getHomeNotice, getBest3 } from '@/apis';

import { useAuth } from '@/hooks';

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

import styles from './MainPage.module.css';

const BOARDS = BOARD_MENUS.filter((board) => [21, 22, 23].includes(board.id));
const BESOOKT_ROLES = [ROLE.user, ROLE.admin, ROLE.official];
const DEFAULT_BESOOKTS = Array.from({ length: 3 }, (_, i) => ({ postId: i }));

export default function MainPage() {
  const { status, userInfo } = useAuth();
  const isLogin = status === 'authenticated';

  const {
    data: slides,
    isLoading: slidesIsLoading,
    isError: slidesIsError,
  } = useQuery({
    queryKey: [QUERY_KEY.banner],
    queryFn: () => getBannerImage(),
    gcTime: Infinity,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: notice,
    isLoading: noticeIsLoading,
    isError: noticeIsError,
  } = useQuery({
    queryKey: [QUERY_KEY.homeNotice],
    queryFn: () => getHomeNotice(),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: besookt3,
    isLoading: besookt3IsLoading,
    isError: isBesookt3Error,
  } = useQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: () => getBest3(),
    staleTime: 1000 * 60 * 5,
    enabled: BESOOKT_ROLES.includes(userInfo?.userRoleId),
  });

  if (slidesIsLoading || noticeIsLoading || besookt3IsLoading) {
    return null;
  }

  if (slidesIsError || noticeIsError || isBesookt3Error) {
    return null;
  }

  const besookts = BESOOKT_ROLES.includes(userInfo?.userRoleId)
    ? besookt3
    : DEFAULT_BESOOKTS;

  return (
    <main>
      <Header className={styles.header} />
      <div className={styles.carousel}>
        <Carousel slides={slides ?? []} delay={3000} />
      </div>
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
      {besookts.length > 0 && (
        <Margin className={styles.besookt}>
          <ListHeader to='/board/besookt' title='베숙트' />
          <Flex direction='column' gap='0.375rem'>
            {besookts.map(
              ({
                boardId,
                postId,
                userDisplay,
                title,
                content,
                boardName,
                createdAt,
              }) => (
                <MainPageListItem
                  key={postId}
                  postId={postId}
                  displayName={userDisplay}
                  title={title}
                  overview={content}
                  boardId={boardId}
                  boardName={boardName}
                  createdAt={createdAt}
                  //image={image}
                  roles={BESOOKT_ROLES}
                />
              )
            )}
          </Flex>
        </Margin>
      )}
      <Footer />
      <PopUp />
    </main>
  );
}

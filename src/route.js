import App from '@/App';
import ProtectedRoute from '@/ProtectedRoute';
import { AboutPage } from '@/pages/AboutPage';
import { AlertPage } from '@/pages/AlertPage';
import { AttendancePage } from '@/pages/AttendancePage';
import { BoardListPage, BoardPage } from '@/pages/BoardPage';
import {
  ChangePasswordPage,
  DeleteAccountPage,
  EditInfoPage,
  MyPage,
  ViewPointListPage,
  MyPostPage,
  CommentPage,
  DownloadExamReviewPage,
  PrivacyPolicyPage,
  ServicePolicyPage,
} from '@/pages/MyPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { ExamReviewDetailPage, ExamReviewPage } from '@/pages/ExamReviewPage';
import { ExamReviewEditPage } from '@/pages/ExamReviewEditPage';
import { ExamReviewWritePage } from '@/pages/ExamReviewWritePage';
import HelpPage from '@/pages/HelpPage/HelpPage';
import {
  LoginPage,
  FindIdPage,
  FindPwPage,
  FoundIdPage,
  FoundPwPage,
  NotFoundIdPage,
  NotFoundPwPage,
} from '@/pages/LoginPage';
import SignUpPage from './pages/LoginPage/SignUpPage/SignUpPage';
import SignUpSuccessPage from './pages/LoginPage/SignUpPage/SignUpSuccessPage/SignUpSuccessPage';
import SignUpFailurePage from './pages/LoginPage/SignUpPage/SignUpPageStages/SignUpFailure/SignUpFailurePage';
import { NoticeListPage } from '@/pages/NoticeListPage';
import { MainPage } from '@/pages/MainPage';
import {
  PostPage,
  PostSearchPage,
  PostWritePage,
  PostEditPage,
} from '@/pages/PostPage';
import { SnoroseVerifyPage } from '@/pages/SnoroseVerifyPage';

import { ROLE } from '@/constants';
import ScrapPage from './pages/MyPage/ActivityPage/ScrapPage';
import ScrapExamReviewPage from './pages/MyPage/ActivityPage/ScrapExamReviewPage';

const getRolesForReadBoard = (boardPath) => {
  switch (boardPath) {
    case 'first-snow':
      return [ROLE.preUser, ROLE.user, ROLE.admin, ROLE.official];
    case 'large-snow':
      return [ROLE.user, ROLE.admin, ROLE.official];
    case 'permanent-snow':
      return [ROLE.user, ROLE.admin, ROLE.official];
    default:
      return [];
  }
};

const getRolesForWriteBoard = (boardPath) => {
  switch (boardPath) {
    case 'first-snow':
      return [ROLE.preUser, ROLE.user, ROLE.admin, ROLE.official];
    case 'large-snow':
      return [ROLE.user, ROLE.admin];
    case 'permanent-snow':
      return [ROLE.user, ROLE.admin];
    default:
      return [];
  }
};

const boardPaths = ['first-snow', 'large-snow', 'permanent-snow', 'besookt'];

const boardRoutes = boardPaths.flatMap((boardPath) => [
  {
    path: `/board/${boardPath}`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        to={`/board`}
        message={'게시판 접근 권한이 없습니다.'}
      >
        <BoardListPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/post/:postId`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        to={`/board/${boardPath}`}
        message={'게시글 접근 권한이 없습니다.'}
      >
        <PostPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/post-write`,
    element: (
      <ProtectedRoute
        roles={getRolesForWriteBoard(boardPath)}
        to={`/board/${boardPath}`}
        message={'게시글 작성 권한이 없습니다.'}
      >
        <PostWritePage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/post/:postId/edit`,
    element: (
      <ProtectedRoute
        roles={getRolesForWriteBoard(boardPath)}
        to={`/board/${boardPath}/post/:postId`}
        message={'게시글 편집 권한이 없습니다.'}
      >
        <PostEditPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/search`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        to={`/board`}
        message={'게시판 접근 권한이 없습니다.'}
      >
        <PostSearchPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/search/:keyword`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        to={`/board`}
        message={'게시판 접근 권한이 없습니다.'}
      >
        <PostSearchPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
  {
    path: `/board/${boardPath}/notice`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        to={`/board`}
        message={'게시판 접근 권한이 없습니다.'}
      >
        <NoticeListPage />
      </ProtectedRoute>
    ),
    meta: {
      hideNav: true,
    },
  },
]);

export const routeList = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/home',
        element: <MainPage />,
      },
      {
        path: '/board',
        element: <BoardPage />,
      },
      ...boardRoutes,
      {
        path: '/board/all/search/:keyword',
        element: <PostSearchPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 게시판 접근 권한이 없습니다.'}
          >
            <ExamReviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/exam-review/post/:postId',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 접근 권한이 없습니다.'}
          >
            <ExamReviewDetailPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review/:postId/edit',
        element: (
          <ExamReviewEditPage
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 수정 권한이 없습니다.'}
          />
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review-write',
        element: (
          <ExamReviewWritePage
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 작성 권한이 없습니다.'}
          />
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/attendance',
        element: <AttendancePage />,
        meta: {
          hideNav: true,
        },
      },
      // {
      //   path: '/alert',
      //   element: <AlertPage />,
      //   meta: {
      //     hideNav: true,
      //   },
      // },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '/my-page/password',
        element: <ChangePasswordPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/edit-info',
        element: <EditInfoPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/view-point-list',
        element: <ViewPointListPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/delete-account',
        element: <DeleteAccountPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/privacy-policy',
        element: <PrivacyPolicyPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/service-policy',
        element: <ServicePolicyPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/my-post',
        element: <MyPostPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/comment',
        element: <CommentPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/download-exam-review',
        element: <DownloadExamReviewPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/scrap',
        element: <ScrapPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/scrap-exam-review',
        element: <ScrapExamReviewPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/about',
        element: <AboutPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/notice',
        element: <NoticeListPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/verify',
        element: (
          <ProtectedRoute>
            <SnoroseVerifyPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/help',
        element: <HelpPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/login',
        element: <LoginPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/find-id',
        element: <FindIdPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/find-pw',
        element: <FindPwPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/found-id',
        element: <FoundIdPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/found-pw',
        element: <FoundPwPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/not-found-id',
        element: <NotFoundIdPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/not-found-pw',
        element: <NotFoundPwPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/signup',
        element: <SignUpPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/signup/success',
        element: <SignUpSuccessPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/signup/failure',
        element: <SignUpFailurePage />,
        meta: {
          hideNav: true,
        },
      },
    ],
  },
];

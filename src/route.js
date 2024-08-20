import App from '@/App';
import ProtectedRoute from '@/ProtectedRoute';
import { AboutPage } from '@/pages/AboutPage';
import { AlertPage } from '@/pages/AlertPage';
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
import { NoticeListPage } from '@/pages/NoticeListPage';
import { MainPage } from '@/pages/MainPage';
import { PostPage, PostSearchPage, PostWritePage } from '@/pages/PostPage';
import { SnoroseVerifyPage } from '@/pages/SnoroseVerifyPage';

import { ROLE } from '@/constants';

const boardPaths = ['first-snow', 'large-snow', 'permanent-snow', 'besookt'];

const boardRoutes = boardPaths.flatMap((boardPath) => [
  {
    path: `/board/${boardPath}`,
    element: (
      <ProtectedRoute>
        <BoardListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/board/${boardPath}/post/:postId`,
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/board/${boardPath}/search`,
    element: (
      <ProtectedRoute>
        <PostSearchPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/board/${boardPath}/notice`,
    element: (
      <ProtectedRoute
        roles={[ROLE.user, ROLE.user2, ROLE.admin, ROLE.official]}
      >
        <NoticeListPage />
      </ProtectedRoute>
    ),
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
        path: '/post',
        element: <PostPage />,
      },
      {
        path: '/search/post',
        element: <PostSearchPage />,
      },
      {
        path: '/post-write',
        element: <PostWritePage />,
      },
      {
        path: '/board/exam-review',
        element: (
          <ProtectedRoute>
            <ExamReviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/exam-review/:postId',
        element: (
          <ProtectedRoute>
            <ExamReviewDetailPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review/:postId/edit',
        element: <ExamReviewEditPage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review-write',
        element: <ExamReviewWritePage />,
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/alert',
        element: <AlertPage />,
      },
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
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/notice',
        element: <NoticeListPage />,
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
    ],
  },
];

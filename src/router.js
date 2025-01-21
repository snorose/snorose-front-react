import App from '@/App';
import ProtectedRoute from '@/ProtectedRoute';
import { AboutPage } from '@/pages/AboutPage';
// import { AlertPage } from '@/pages/AlertPage';
import { AttendancePage } from '@/pages/AttendancePage';
import { BoardPage } from '@/pages/BoardPage';
import {
  MyPage,
  PointLogsPage,
  ChangePasswordPage,
  EditInfoPage,
  DeleteAccountPage,
  ActivityPage,
  PrivacyPolicyPage,
  ServicePolicyPage,
} from '@/pages/MyPage';
import { ExamReviewPage } from '@/pages/ExamReviewPage';
import { ExamReviewsPage } from '@/pages/ExamReviewsPage';
import { ExamReviewEditPage } from '@/pages/ExamReviewEditPage';
import { ExamReviewWritePage } from '@/pages/ExamReviewWritePage';
import {
  LoginPage,
  FindIdPage,
  FindPwPage,
  FoundIdPage,
  FoundPwPage,
  NotFoundIdPage,
  NotFoundPwPage,
} from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
  SignUpPage,
  SignUpSuccessPage,
  SignUpFailurePage,
} from '@/pages/LoginPage';
import { NoticeListPage } from '@/pages/NoticeListPage';
import { MainPage } from '@/pages/MainPage';
import { PostPage, PostWritePage, PostEditPage } from '@/pages/PostPage';
import { PostsPage } from '@/pages/PostsPage';
import { SearchPage } from '@/pages/SearchPage';
import { SnoroseVerifyPage } from '@/pages/SnoroseVerifyPage';

import { ROLE } from '@/constants';

import { CheckExamPeriodRoute } from '@/components/Route/CheckExamPeriodRoute.jsx';

const getRolesForReadBoard = (boardPath) => {
  switch (boardPath) {
    case 'first-snow':
      return [ROLE.preUser, ROLE.user, ROLE.admin, ROLE.official];
    case 'large-snow':
      return [ROLE.user, ROLE.admin, ROLE.official];
    case 'permanent-snow':
      return [ROLE.user, ROLE.admin, ROLE.official];
    case 'besookt':
      return [ROLE.user, ROLE.admin, ROLE.official];
    case 'all':
      return [ROLE.preUser, ROLE.user, ROLE.admin, ROLE.official];
    case 'notice':
      return [
        ROLE.preUser,
        ROLE.user,
        ROLE.admin,
        ROLE.official,
        ROLE.blacklist,
      ];
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
    case 'notice':
      return [ROLE.admin];
    default:
      return [];
  }
};

const boardPaths = [
  'first-snow',
  'large-snow',
  'permanent-snow',
  'besookt',
  'all',
  'notice',
];

const boardRoutes = boardPaths.flatMap((boardPath) => [
  {
    path: `/board/${boardPath}`,
    element: (
      <ProtectedRoute
        roles={getRolesForReadBoard(boardPath)}
        message={'게시판 접근 권한이 없습니다.'}
      >
        {boardPath === 'notice' ? <NoticeListPage /> : <PostsPage />}
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
        message={'게시판 접근 권한이 없습니다.'}
      >
        <NoticeListPage />
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
        message={'게시판 접근 권한이 없습니다.'}
      >
        <SearchPage />
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
        path: '/board/all/search',
        element: <SearchPage />,
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
            <ExamReviewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `/board/exam-review/notice`,
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 게시판 접근 권한이 없습니다.'}
          >
            <NoticeListPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review/search',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 게시판 접근 권한이 없습니다.'}
          >
            <ExamReviewsPage />
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
            <ExamReviewPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review-notice/post/:postId',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'공지글 접근 권한이 없습니다.'}
          >
            <PostPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review-notice/post/:postId/edit',
        element: (
          <ProtectedRoute
            roles={[ROLE.admin]}
            message={'공지글 수정 권한이 없습니다.'}
          >
            <PostEditPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review/:postId/edit',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.admin]}
            message={'시험후기 수정 권한이 없습니다.'}
          >
            <ExamReviewEditPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/board/exam-review-write',
        element: (
          <CheckExamPeriodRoute>
            <ProtectedRoute
              roles={[ROLE.user, ROLE.admin]}
              message={'시험후기 작성 권한이 없습니다.'}
            >
              <ExamReviewWritePage />
            </ProtectedRoute>
          </CheckExamPeriodRoute>
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
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-page/password',
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/edit-info',
        element: (
          <ProtectedRoute>
            <EditInfoPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/view-point-list',
        element: (
          <ProtectedRoute>
            <PointLogsPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/delete-account',
        element: (
          <ProtectedRoute>
            <DeleteAccountPage />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/comment',
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/download-exam-review',
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/scrap',
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
        meta: {
          hideNav: true,
        },
      },
      {
        path: '/my-page/scrap-exam-review',
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
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
        path: '/verify',
        element: (
          <ProtectedRoute
            roles={[ROLE.preUser, ROLE.admin]}
            message='이미 인증을 완료했거나 인증 대상이 아닙니다'
          >
            <SnoroseVerifyPage />
          </ProtectedRoute>
        ),
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
      {
        path: '*',
        element: <NotFoundPage />,
        meta: {
          hideNav: true,
        },
      },
    ],
  },
];

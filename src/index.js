import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { ToastProvider } from './contexts/ToastContext.jsx';

import App from './App';
import { BoardListPage, BoardPage } from './pages/BoardPage';
import {
  ChangePasswordPage,
  DeleteAccountPage,
  EditInfoPage,
  MyPage,
  ViewPointListPage,
  MyPostPage,
  CommentPage,
  DownloadTestReviewPage,
  PrivacyPolicyPage,
  ServicePolicyPage,
} from './pages/MyPage';
import { PostPage, PostSearchPage, PostWritePage } from './pages/PostPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AlertPage from './pages/AlertPage/AlertPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { ErrorPage } from './pages/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import ExamReviewWritePage from './pages/ExamReviewWritePage/ExamReviewWritePage';
import HelpPage from './pages/HelpPage/HelpPage';
import { MainPage } from './pages/MainPage';
import NoticePage from './pages/NoticePage/NoticePage';
import ProtectedRoute from './ProtectedRoute';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import {
  LoginPage,
  FindIdPage,
  FindPwPage,
  FoundIdPage,
  FoundPwPage,
  NotFoundIdPage,
  NotFoundPwPage,
} from './pages/LoginPage';

import { ROLE } from './constants';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'home', element: <MainPage /> },
      { path: '/board', element: <BoardPage /> },
      {
        path: '/board/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/first-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/first-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/large-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/large-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/permanent-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/permanent-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/besookt',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.user2, ROLE.admin, ROLE.official]}
          >
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/besookt/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: '/post', element: <PostPage /> },
      { path: '/post-search', element: <PostSearchPage /> },
      { path: '/post-write', element: <PostWritePage /> },
      { path: 'exam-review', element: <ExamReviewPage /> },
      { path: 'exam-review-write', element: <ExamReviewWritePage /> },
      { path: 'alert', element: <AlertPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'my-page/password', element: <ChangePasswordPage /> },
      { path: 'my-page/edit-info', element: <EditInfoPage /> },
      { path: 'my-page/view-point-list', element: <ViewPointListPage /> },
      { path: 'my-page/delete-account', element: <DeleteAccountPage /> },
      { path: 'my-page/privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'my-page/service-policy', element: <ServicePolicyPage /> },
      { path: 'my-page/my-post', element: <MyPostPage /> },
      { path: 'my-page/comment', element: <CommentPage /> },
      {
        path: 'my-page/download-test-review',
        element: <DownloadTestReviewPage />,
      },
      { path: 'about', element: <AboutPage /> },
      { path: 'notice', element: <NoticePage /> },
      { path: 'authentication', element: <AuthPage /> },
      { path: 'help', element: <HelpPage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'find-id',
        element: <FindIdPage />,
      },
      {
        path: 'find-pw',
        element: <FindPwPage />,
      },
      {
        path: 'found-id',
        element: <FoundIdPage />,
      },
      {
        path: 'found-pw',
        element: <FoundPwPage />,
      },
      {
        path: 'not-found-id',
        element: <NotFoundIdPage />,
      },
      {
        path: 'not-found-pw',
        element: <NotFoundPwPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();

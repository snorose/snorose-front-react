import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AboutPage from './pages/AboutPage/AboutPage';
import AlertPage from './pages/AlertPage/AlertPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { BoardPage, BoardListPage } from './pages/BoardPage';
import { PostPage, PostSearchPage, PostWritePage } from './pages/PostPage';
import {
  MyPage,
  ChangePasswordPage,
  EditInfoPage,
  DeleteAccountPage,
} from './pages/MyPage';
import ViewPointListPage from './pages/MyPage/ViewPointListPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import HelpPage from './pages/HelpPage/HelpPage';
import MainPage from './pages/MainPage/MainPage';
import NoticePage from './pages/NoticePage/NoticePage';
import reportWebVitals from './reportWebVitals';
import App from './App';
import ProtectedRoute from './ProtectedRoute.jsx';
import './index.css';
import { ROLE } from './constants';
import LoginPage from './pages/LoginPage/Login';
import FindIdPage from './pages/LoginPage/FindIdPage/FindIdPage';
import FoundIdPage from './pages/LoginPage/FoundIdPage/FoundIdPage.jsx';
import NotFoundIdPage from './pages/LoginPage/NotFoundIdPage/NotFoundIdPage.jsx';

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
        path: '/board/first-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
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
        path: '/board/permanent-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
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
      { path: '/post', element: <PostPage /> },
      { path: '/post-search', element: <PostSearchPage /> },
      { path: '/post-write', element: <PostWritePage /> },
      { path: 'exam-review', element: <ExamReviewPage /> },
      { path: 'alert', element: <AlertPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'my-page/password', element: <ChangePasswordPage /> },
      { path: 'my-page/edit-info', element: <EditInfoPage /> },
      { path: 'my-page/view-point-list', element: <ViewPointListPage /> },
      { path: 'my-page/delete-account', element: <DeleteAccountPage /> },
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
        path: 'found-id',
        element: <FoundIdPage />,
      },
      {
        path: 'not-found-id',
        element: <NotFoundIdPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

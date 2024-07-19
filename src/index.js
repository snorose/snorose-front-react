import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AboutPage from './pages/AboutPage/AboutPage';
import AlertPage from './pages/AlertPage/AlertPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { BoardPage, BoardListPage } from './pages/BoardPage';
import { PostPage, PostSearchPage, PostWritePage } from './pages/PostPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import HelpPage from './pages/HelpPage/HelpPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import DeleteAccountPage from './pages/MyPage/DeleteAccountPage';
import NoticePage from './pages/NoticePage/NoticePage';
import reportWebVitals from './reportWebVitals';
import EditInfoPage from './pages/MyPage/EditInfoPage';
import ChangePassword from './pages/MyPage/ChangePassword';
import App from './App';
import ProtectedRoute from './ProtectedRoute.jsx';
import './index.css';
import { ROLE } from './constants';

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
      { path: 'my-page/password', element: <ChangePassword /> },
      { path: 'my-page/edit-info', element: <EditInfoPage /> },
      { path: 'my-page/delete-account', element: <DeleteAccountPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'notice', element: <NoticePage /> },
      { path: 'authentication', element: <AuthPage /> },
      { path: 'help', element: <HelpPage /> },
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

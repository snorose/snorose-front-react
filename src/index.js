import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
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
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import HelpPage from './pages/HelpPage/HelpPage';
import MainPage from './pages/MainPage/MainPage';
import NoticePage from './pages/NoticePage/NoticePage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'home', element: <MainPage /> },
      { path: '/board', element: <BoardPage /> },
      { path: '/board/first-snow', element: <BoardListPage /> },
      { path: '/board/large-snow', element: <BoardListPage /> },
      { path: '/board/permanent-snow', element: <BoardListPage /> },
      { path: '/board/besookt', element: <BoardListPage /> },
      { path: '/post', element: <PostPage /> },
      { path: '/post-search', element: <PostSearchPage /> },
      { path: '/post-write', element: <PostWritePage /> },
      { path: 'exam-review', element: <ExamReviewPage /> },
      { path: 'alert', element: <AlertPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'my-page/password', element: <ChangePasswordPage /> },
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

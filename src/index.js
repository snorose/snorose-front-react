import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import AboutPage from './pages/AboutPage/AboutPage';
import AlertPage from './pages/AlertPage/AlertPage';
import AuthPage from './pages/AuthPage/AuthPage';
import BoardListPage from './pages/BoardListPage/BoardListPage';
import BoardPage from './pages/BoardPage/BoardPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import HelpPage from './pages/HelpPage/HelpPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import NoticePage from './pages/NoticePage/NoticePage';
import reportWebVitals from './reportWebVitals';
import EditInfoPage from './pages/MyPage/EditInfoPage';
import ChangePassword from './pages/MyPage/ChangePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'home', element: <MainPage /> },
      {
        path: '/board',
        element: <BoardPage />,
        children: ['first-snow', 'large-snow', 'permanent-snow', 'besookt'].map(
          (path) => ({
            path,
            element: <BoardListPage />,
          })
        ),
      },
      { path: 'exam-review', element: <ExamReviewPage /> },
      { path: 'alert', element: <AlertPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'my-page/password', element: <ChangePassword /> },
      { path: 'my-page/edit-info', element: <EditInfoPage /> },
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

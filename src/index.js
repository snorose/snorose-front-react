import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ToastProvider } from '@/shared/context/ToastContext';

import { CommentContextProvider } from '@/feature/comment/context';
import { routeList } from '@/router.js';

import '@/index.css';
import reportWebVitals from '@/reportWebVitals';

import { ModalProvider } from './shared/context/ModalContext';

const router = createBrowserRouter(routeList);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ModalProvider>
          <CommentContextProvider>
            <RouterProvider router={router} />
          </CommentContextProvider>
        </ModalProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();

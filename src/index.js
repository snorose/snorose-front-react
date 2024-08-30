import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CommentContextProvider } from './contexts/CommentContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { TokenProvider } from './contexts/TokenContext.jsx';

import { routeList } from './route.js';

import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(routeList);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => console.error(error),
    },
  },
  queryCache: new QueryCache({
    onError: (error) => console.error(error),
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <ToastProvider>
          <CommentContextProvider>
            <RouterProvider router={router} />
          </CommentContextProvider>
        </ToastProvider>
      </TokenProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();

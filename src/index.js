import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CommentContextProvider } from '@/contexts/CommentContext.jsx';
import { ToastProvider } from '@/contexts/ToastContext.jsx';

import { routeList } from '@/route.js';

import '@/index.css';
import reportWebVitals from '@/reportWebVitals';

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
        <CommentContextProvider>
          <RouterProvider router={router} />
        </CommentContextProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GrowthBookProvider } from '@growthbook/growthbook-react';

import { ModalProvider } from '@/shared/context/ModalContext';
import { ToastProvider } from '@/shared/context/ToastContext';
import { growthbook } from '@/shared/lib';

import { CommentContextProvider } from '@/feature/comment/context';
import { routeList } from '@/router.js';

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

growthbook.init({ streaming: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <GrowthBookProvider growthbook={growthbook}>
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
    </GrowthBookProvider>
  </React.StrictMode>
);

reportWebVitals();

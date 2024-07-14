import React from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function PTR({ children }) {
  const handleRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Refreshed!');
        resolve();
      }, 2000); // Example: Simulating a refresh delay of 2 seconds
    });
  };

  return <PullToRefresh onRefresh={handleRefresh}>{children}</PullToRefresh>;
}

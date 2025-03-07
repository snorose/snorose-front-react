// src/components/NotificationCard.js
import React from 'react';

const NotificationCard = ({ title, body }) => {
  return (
    <div
      style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}
    >
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default NotificationCard;

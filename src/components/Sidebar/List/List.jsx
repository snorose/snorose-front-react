import React from 'react';
import { Link } from 'react-router-dom';

export default function List({ items }) {
  return (
    <ul>
      {items &&
        items.map(({ to, name }) => (
          <Link to={to} key={name}>
            <li>{name}</li>
          </Link>
        ))}
    </ul>
  );
}

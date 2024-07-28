import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FoundIdPage.module.css';

export default function FoundIdPage() {
  const { state } = useLocation();
  return <div>{state.loginId}</div>;
}

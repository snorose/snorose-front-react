import React from 'react';
import styles from './FoundIdPage.module.css';

export default function FoundIdPage() {
  return <div>{this.props.location.state.loginId}</div>;
}

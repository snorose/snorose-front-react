import { useState } from 'react';

import { Icon } from '@/shared/component';
import InputLayout from '@/shared/component/form/input/InputLayout';

import styles from './PasswordInput.module.css';

export default function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  status = 'default',
}) {
  const [visible, setVisible] = useState(false);
  const fillColor = {
    defauilt: 'var(--grey-1-1)',
    valid: 'var(--blue-0)',
    error: 'var(--pink-1)',
  }[status];

  return (
    <InputLayout status={status}>
      <input
        id={id}
        type={visible ? 'type' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Icon
        className={styles.icon}
        id={visible ? 'opened-eye' : 'closed-eye'}
        fill={fillColor}
        width={24}
        height={24}
        onClick={() => setVisible((prev) => !prev)}
      />
    </InputLayout>
  );
}

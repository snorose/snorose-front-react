import { useState } from 'react';

import style from './SettingItem.module.css';

const backgroundStyle = {
  default: style.gradient,
  blue: style.blue,
  grey: style.grey,
};

export default function SettingItem({
  title,
  content,
  enabled,
  type = 'default',
}) {
  return (
    <div className={`${style.container} ${backgroundStyle[type]}`}>
      <div className={style.left}>
        <div className={style.title}>{title}</div>
        <div className={style.content}>{content}</div>
      </div>

      <div className={style.right}>
        <Switch enabled={enabled} />
        <div className={style.termsLink}>약관</div>
      </div>
    </div>
  );
}

function Switch({ enabled = false }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const toggle = () => setIsEnabled((prev) => !prev);

  return (
    <div
      className={`${style.switch} ${isEnabled ? style.on : style.off}`}
      onClick={toggle}
    >
      <div className={style.slider}></div>
    </div>
  );
}

import { Link } from 'react-router-dom';

import style from './SettingItem.module.css';

const backgroundStyle = {
  default: style.gradient,
  blue: style.blue,
};

export default function SettingItem({
  title,
  content,
  isEnabled,
  onToggle,
  variant = 'default',
  hasTerms = false,
  to,
  disabled = false,
}) {
  return (
    <div
      className={`${style.container} ${backgroundStyle[variant]} ${disabled ? style.disabled : ''}`}
    >
      <div className={style.left}>
        <div className={style.title}>{title}</div>
        <div className={style.content}>{content}</div>
      </div>

      <div className={style.right}>
        <Switch isEnabled={isEnabled} onToggle={onToggle} disabled={disabled} />
        {hasTerms && (
          <Link to={to} className={style.termsLink}>
            약관
          </Link>
        )}
      </div>
    </div>
  );
}

function Switch({ isEnabled = false, onToggle, disabled }) {
  const enabled = disabled ? false : isEnabled;

  return (
    <div
      className={`${style.switch} ${enabled ? style.on : style.off}`}
      onClick={disabled ? undefined : onToggle}
    >
      <div className={style.slider}></div>
    </div>
  );
}

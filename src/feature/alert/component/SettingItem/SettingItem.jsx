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
        <div className={style.termsLink}>약관</div>
      </div>
    </div>
  );
}

function Switch({ isEnabled = false, onToggle, disabled }) {
  return (
    <div
      className={`${style.switch} ${isEnabled ? style.on : style.off}`}
      onClick={disabled ? undefined : onToggle}
    >
      <div className={style.slider}></div>
    </div>
  );
}

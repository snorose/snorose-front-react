import style from './GradientBox.module.css';

export default function GradientBox({ type = 'default', children }) {
  const inlineStyle = {
    gray: style.gray,
    pink: style.pink,
    default: null,
  };

  return (
    <div className={`${style.container} ${inlineStyle[type]}`}>{children}</div>
  );
}

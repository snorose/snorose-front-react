import style from './GradientBox.module.css';

export default function GradientBox({
  padding = '14px',
  height = 'auto',
  children,
}) {
  const boxStyle = {};

  if (padding !== undefined) {
    boxStyle.padding = padding;
  }

  if (height !== undefined) {
    boxStyle.height = height;
  }

  return (
    <div className={style.container} style={boxStyle}>
      {children}
    </div>
  );
}

import { GradientBox } from '@/shared/component';

import style from './SettingToggleBox.module.css';

export default function SettingToggleBox({ title, content, isEnabled }) {
  return (
    <GradientBox>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.title}>{title}</div>
          <div className={style.content}>{content}</div>
        </div>

        <div className={style.right}>
          <div>{isEnabled}: 토글 버튼 </div>
          <div>약관</div>
        </div>
      </div>
    </GradientBox>
  );
}

import { useState } from 'react';

import { Input } from '@/shared/component';
import { Icon } from '@/shared/component';

import styles from './SpecialInput.module.css';

export default function SpecialInput({
  title,
  placeholder,
  className,
  setClassName,
  classNameCheck,
  inputType,
  inputData,
  data,
  id1,
  id2,
  color1,
  color2,
  color3,
  state1,
  state2,
  errMsg,
}) {
  const [isBtnClick, setIsBtnClick] = useState(false);
  const toggleBtn = () => {
    setIsBtnClick((prev) => !prev);
  };
  const checkColor = (c1, c2, c3) => {
    if (className === 'ready') return c1;
    else if (className === 'right') return c2;
    else return c3;
  };
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.pwFrame} ${styles[className]}`}>
        <Input
          type={isBtnClick ? state1 : state2 ? state2 : state1}
          placeholder={placeholder}
          className={className}
          setClassName={setClassName}
          classNameCheck={classNameCheck}
          inputType={inputType}
          inputData={inputData}
          data={data}
        />
        {data[inputType] && (
          <Icon
            id={isBtnClick ? id2 : id1}
            fill={checkColor(color1, color2, color3)}
            width={24}
            height={24}
            className={styles.icon}
            onClick={toggleBtn}
          />
        )}
      </div>
      {className === 'wrong' && <p className={styles.error}>{errMsg}</p>}
    </div>
  );
}

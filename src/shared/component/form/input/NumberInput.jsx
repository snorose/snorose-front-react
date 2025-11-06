import { validClassNumber } from '@/shared/lib';
import InputLayout from '@/shared/component/form/input/InputLayout';

export default function NumberInput({
  id,
  value,
  onChange,
  placeholder,
  status = 'default',
}) {
  return (
    <InputLayout status={status}>
      <input
        id={id}
        type='text'
        value={value}
        placeholder={placeholder}
        inputMode='numeric'
        onChange={(e) => {
          const { value: number } = e.target;

          if (validClassNumber(number)) {
            onChange(number);
          }
        }}
      />
    </InputLayout>
  );
}

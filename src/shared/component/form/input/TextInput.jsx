import InputLayout from '@/shared/component/form/input/InputLayout';

export default function TextInput({
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
        onChange={(e) => onChange(e.target.value)}
      />
    </InputLayout>
  );
}

import InputLayout from '@/shared/component/form/input/InputLayout';

export default function TextInput({ id, value, onChange, placeholder }) {
  return (
    <InputLayout>
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

import TextareaAutosize from 'react-textarea-autosize';
import styles from './FormField.module.css';
import { useToast } from '@/shared/hook';
import { PrimaryButton } from '@/shared/component';
import { TOAST } from '@/shared/constant';
import { isUrlValid } from '@/feature/event/lib';

export default function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  data = {},
  ...props
}) {
  const { toast } = useToast();

  const handleCheckLink = () => {
    if (!data.link?.trim()) {
      toast({ message: TOAST.EVENT.EMPTY, variant: 'error' });
      return;
    }
    if (!isUrlValid(data.link, { open: true })) {
      toast({ message: TOAST.EVENT.FAIL, variant: 'error' });
    }
  };

  return (
    <div className={styles.section}>
      <p>{label}</p>

      {type === 'text' ? (
        <div className={label === '연계 링크' ? styles.linkArea : undefined}>
          <TextareaAutosize
            className={`${styles.textarea} ${error ? styles.error : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            {...props}
          />
          {label === '연계 링크' && (
            <PrimaryButton className={styles.button} onClick={handleCheckLink}>
              미리
              <br />
              보기
            </PrimaryButton>
          )}
        </div>
      ) : (
        <div className={styles.dateSection}>
          <input
            type={type}
            className={`${styles.dateInput} ${error ? styles.error : ''}`}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            {...props}
          />
        </div>
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

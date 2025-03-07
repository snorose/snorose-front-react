import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { StageDots } from '@/feature/account/component';

import {
  AccountInfoStep,
  AuthorizationStep,
  UserInfoStep,
} from '@/page/account';

import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  return (
    <div className={styles.pageFrame}>
      <div className={styles.signupFrame}>
        <div className={styles.navFrame}>
          <Icon
            id='arrow-left'
            width={19}
            height={17}
            onClick={() => {
              if (stage > 1) {
                setStage((prev) => prev - 1);
              } else navigate('/login');
            }}
          />
        </div>
        <div className={styles.stageDotsFrame}>
          <StageDots
            quantity={3}
            current={stage}
            width='3.125rem'
            size='0.625rem'
            gap='0.688rem'
          />
        </div>
        {stage === 1 ? (
          <AccountInfoStep
            setFormData={setFormData}
            formData={formData}
            setStage={setStage}
          />
        ) : stage === 2 ? (
          <AuthorizationStep email={formData.email} setStage={setStage} />
        ) : (
          <UserInfoStep
            setFormData={setFormData}
            formData={formData}
            setStage={setStage}
          />
        )}
      </div>
    </div>
  );
}

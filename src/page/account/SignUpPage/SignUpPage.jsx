import { useState } from 'react';

import { BackAppBar } from '@/shared/component';
import { StageDots } from '@/feature/account/component';

import {
  AccountInfoStep,
  AuthorizationStep,
  UserInfoStep,
} from '@/feature/account/component';

import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <div className={styles.pageFrame}>
      <BackAppBar notFixed />

      <div className={styles.stageDotsFrame}>
        <StageDots
          quantity={3}
          current={stage}
          width='5.4rem'
          size='1rem'
          gap='1.2rem'
        />
      </div>

      <div className={styles.signupFrame}>
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

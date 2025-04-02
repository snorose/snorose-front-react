import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { StageDots } from '@/feature/account/component';

import {
  AccountInfoPage,
  AuthorizationPage,
  UserInfoPage,
} from '@/pages/LoginPage/SignUpPage/SignUpPageStages';

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
            width='50px'
            size='10px'
            gap='11.008px'
          />
        </div>
        {stage === 1 ? (
          <AccountInfoPage
            setFormData={setFormData}
            formData={formData}
            setStage={setStage}
          />
        ) : stage === 2 ? (
          <AuthorizationPage email={formData.email} setStage={setStage} />
        ) : (
          <UserInfoPage
            setFormData={setFormData}
            formData={formData}
            setStage={setStage}
          />
        )}
      </div>
    </div>
  );
}

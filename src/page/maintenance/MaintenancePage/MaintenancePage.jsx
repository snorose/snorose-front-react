import {
  MAINTENANCE_START,
  MAINTENANCE_END,
  useMaintenance,
} from '@/feature/maintenance/hook/useMaintenance';

import MaintenanceConfig from '@/assets/illustrations/maintenanceConfig.svg';
import { Icon } from '@/shared/component';

import styles from './MaintenancePage.module.css';

export default function MaintenancePage() {
  const period = useMaintenance(MAINTENANCE_START, MAINTENANCE_END);
  return (
    <div className={styles.main}>
      <img src={MaintenanceConfig} alt='서버 점검' />
      <h1 className={styles.title}>스노로즈 서버 점검 안내</h1>
      <div className={styles.text}>
        <p className={styles.date}>일시 : {period}</p>

        <p className={styles.content}>
          안정적인 서비스 제공을 위한 서버 점검을 하고 있어요.
          <br />
          이용에 불편을 드리게 된 점 양해 부탁드립니다.
        </p>
      </div>
      <Icon className={styles.logo} id='logo' width={221} height={25} />
    </div>
  );
}

import HomePageSetting from './HomePageSetting';
import AuthSetting from './AuthSetting';
import styles from './index.less';

export default function Settings() {
  return (
    <div className={styles.page}>
      <HomePageSetting />
      <AuthSetting />
    </div>
  );
}

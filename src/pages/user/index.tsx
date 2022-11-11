import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.less';

const User: React.FC = (props) => {
  const { account } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>{account}</div>
        <div style={{ display: 'flex' }}>
          <div className={`${styles.card} ${styles.center}`}>left</div>
          <div style={{ flex: 1 }}>
            <div className={styles.card}>1</div>
            <div className={styles.card}>2</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;

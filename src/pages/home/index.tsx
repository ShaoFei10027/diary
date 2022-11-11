import React from 'react';
import News from '@/pages/components/news';
import { Collapse } from 'antd';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ width: '400px' }}>
        <News />
      </div>
    </div>
  );
};
export default Home;

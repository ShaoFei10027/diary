import React, { useState } from 'react';
import { intl } from '@/locale';
import { Row, Col, Typography } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import styles from './common.less';

const { Paragraph } = Typography;

export default function HomePageSetting() {
  const [home, setHome] = useState<string>(
    'http://localhost:3000/admin/settings'
  );
  return (
    <div className={styles.setting}>
      <div className={styles.header}>{intl.get('Home_Page_Settings')}</div>
      <Row>
        <Col span={2}>{intl.get('Current_Home_Page')}：</Col>
        <Col span={22}>
          <Paragraph
            editable={{
              onChange: setHome,
            }}
          >
            {home}
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}

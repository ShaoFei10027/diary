import React, { useState } from 'react';
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
      <div className={styles.header}>主页设置</div>
      <Row>
        <Col span={2}>当前主页：</Col>
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

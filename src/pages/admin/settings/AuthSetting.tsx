import { Table } from 'antd';
import { intl } from '@/locale';

import styles from './common.less';

const columns = [
  {
    width: '150px',
    title: (
      <div className={styles.splitCell}>
        <div className={styles.left}>页面、功能</div>
        <div className={styles.right}>{intl.get('role')}</div>
      </div>
    ),
    dataIndex: 'page',
  },
  {
    title: intl.get('visitor'),
    dataIndex: 'y',
  },
  {
    title: intl.get('Registered_Member'),
    dataIndex: 'l0',
  },
  {
    title: 'L1',
    dataIndex: 'l1',
  },
  {
    title: 'L2',
    dataIndex: 'l2',
  },
  {
    title: intl.get('Invite_Tests'),
    dataIndex: 'test',
  },
];

const data = [
  {
    page: intl.get('browse'),
  },
  {
    page: '回复、留言',
  },
  {
    page: intl.get('Theme_Colors'),
  },
  {
    page: intl.get('Internal_test_function'),
  },
  // {
  //   page: '下载文档',
  // },
  // {
  //   page: '全部视频',
  // },
];

export default function AuthSetting() {
  return (
    <div className={styles.setting}>
      <div className={styles.header}>{intl.get('Permission_Settings')}</div>
      <div>
        <Table
          bordered
          className={styles.changeCellTable}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="page"
        />
      </div>
    </div>
  );
}

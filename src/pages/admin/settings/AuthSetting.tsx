import { Table } from 'antd';

import styles from './common.less';

const columns = [
  {
    width: '150px',
    title: (
      <div className={styles.splitCell}>
        <div className={styles.left}>页面、功能</div>
        <div className={styles.right}>角色</div>
      </div>
    ),
    dataIndex: 'page',
  },
  {
    title: '访客',
    dataIndex: 'y',
  },
  {
    title: '注册会员',
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
    title: '邀请测试',
    dataIndex: 'test',
  },
];

const data = [
  {
    page: '浏览',
  },
  {
    page: '回复、留言',
  },
  {
    page: '主题颜色',
  },
  {
    page: '内测功能',
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
      <div className={styles.header}>权限设置</div>
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

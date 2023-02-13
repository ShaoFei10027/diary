import React, { useEffect, useState } from 'react';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Form, Button, Table, message, Alert, Steps } from 'antd';
import { getUser, getDulpTranslateData, updateTransDate } from '@/api';
import moment from 'moment';
import Card from '@/pages/components/card';
import styles from './index.less';

interface ListDataType {
  id: number;
  ukey: string;
  english: string;
  chinese: string;
  update_time?: number;
}

const { Step } = Steps;

const StepText = [
  {
    loading: {
      title: '生成文件',
      desc: '根据数据列表生成相应的数据文件',
    },
    finish: {
      title: '已生成文件',
    },
  },
  {
    loading: {
      title: '更新版本',
      desc: '即将修改前端引入locale文件版本',
    },
    finish: {
      title: '已更新依赖',
    },
  },
  {
    loading: {
      title: '打包发布',
      desc: '打包前端文件并发布',
    },
    finish: {
      title: '发布完成',
      desc: '已更新',
    },
  },
];

export default function Publish() {
  const [form] = Form.useForm();
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<ListDataType>();
  const [visible, setVisible] = useState(false);
  const getData = () => {
    getDulpTranslateData()
      .then((res) => {
        if (res.success) {
          setListData(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const onEdit = (record: ListDataType) => {
    setRecord(record);
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onOk = (params: ListDataType) => {
    updateTransDate(params).then((res) => {
      if (res.success) {
        message.success('修改成功！');
        setVisible(false);
        getData();
      } else {
        message.error(res?.data?.message || '修改失败');
      }
    });
  };
  const columns = [
    {
      title: '重复的key值',
      dataIndex: 'ukey',
      width: '15%',
    },
    {
      title: '英文',
      dataIndex: 'english',
      width: '25%',
    },
    {
      title: '中文',
      dataIndex: 'chinese',
      width: '25%',
    },
    {
      title: '最后修改时间',
      dataIndex: 'update_time',
      render: (v: number) => moment(v).format('YYYY-MM-DD HH:mm:ss'),
      width: '200px',
    },
    {
      title: '操作',
      render: ({}, record: ListDataType) => (
        <div className={styles.btnsLink}>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type="link">删除</Button>
        </div>
      ),
      width: '200px',
    },
  ];
  return (
    <div className={styles.page}>
      <Card title="数据处理与发布">
        {listData && listData.length ? (
          <Alert
            message="检测到重复的key值，发布前请慎重处理！"
            type="warning"
          />
        ) : (
          <Alert
            message="恭喜！所有key值唯一，现在开始发布吧！"
            type="success"
          />
        )}
        <div>
          <div style={{ margin: '20px 0' }}>
            <div style={{ margin: '20px', width: '720px' }}>
              <Steps current={0}>
                {StepText.map((item, i) => {
                  return (
                    <Step
                      title={item.loading.title}
                      description={item.loading.desc}
                      icon={i > 0 ? <SmileOutlined /> : <LoadingOutlined />}
                      key={item.loading.title}
                    />
                  );
                })}
              </Steps>
            </div>
            <Button type="primary" danger>
              开始发布
            </Button>
          </div>
          {listData && listData.length && (
            <Table
              columns={columns}
              dataSource={listData}
              rowKey="id"
              pagination={false}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

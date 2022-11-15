import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Button, Table, message } from 'antd';
import { getUser, getTranslateData, updateTransDate } from '@/api';
import moment from 'moment';
import Card from '@/pages/components/card';
import EditModal from './Edit';
import styles from './index.less';

interface ListDataType {
  id: number;
  ukey: string;
  english: string;
  chinese: string;
  update_time?: number;
}

interface SearchDataType {
  ukey?: string;
  startTime?: number;
  endTime?: number;
}

const { RangePicker } = DatePicker;

export default function Translate() {
  const [form] = Form.useForm();
  const [listData, setListData] = useState<ListDataType[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<ListDataType>();
  const [visible, setVisible] = useState(false);
  const getData = () => {
    const { key, time } = form.getFieldsValue();
    const searchData: SearchDataType = {};
    if (key) {
      searchData.ukey = key;
    }
    if (time) {
      searchData.startTime = time[0].format();
      searchData.endTime = time[1].format();
    }
    getTranslateData({
      page,
      pageSize,
      ...searchData,
    })
      .then((res) => {
        if (res.success) {
          setListData(res.data.list);
          setTotal(res.data.total);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const onSearch = () => {
    setLoading(true);
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  };
  useEffect(() => {
    getData();
  }, [page, pageSize]);
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
      title: 'key',
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
      <Card title="数据列表">
        <div className={styles.search}>
          <Form form={form} layout="inline">
            <Form.Item label="关键词" name="key">
              <Input />
            </Form.Item>
            <Form.Item label="更新时间" name="time">
              <RangePicker placeholder={['开始时间', '结束时间']} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={loading} onClick={onSearch}>
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={listData}
            rowKey="id"
            pagination={{
              total,
              onChange: onPageChange,
            }}
          />
          {record && (
            <EditModal
              visible={visible}
              data={record}
              onCancel={onCancel}
              onOk={onOk}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

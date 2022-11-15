import { useEffect } from 'react';
import moment from 'moment';
import { Modal, Form, Input, ModalProps } from 'antd';

interface DataType {
  id: number;
  ukey: string;
  english: string;
  chinese: string;
  update_time?: number;
}
interface IProps {
  visible: boolean;
  data?: DataType;
  onCancel?: Function;
  onOk?: Function;
}

export default function Edit(props: IProps) {
  const [form] = Form.useForm();
  const { visible, data, onOk, onCancel } = props;
  const onClose = () => {
    onCancel && onCancel();
  };
  const onFinish = () => {
    const formData = form.getFieldsValue();
    data &&
      onOk &&
      onOk({
        ...formData,
        id: data.id,
      });
  };
  return (
    <Modal
      title="编辑"
      visible={visible}
      onOk={onFinish}
      onCancel={onClose}
      width="720px"
      okText="确定"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="key" name="ukey" initialValue={data?.ukey}>
          <Input />
        </Form.Item>
        <Form.Item label="英文" name="english" initialValue={data?.english}>
          <Input.TextArea autoSize={{ maxRows: 4, minRows: 4 }} />
        </Form.Item>
        <Form.Item label="中文" name="chinese" initialValue={data?.chinese}>
          <Input.TextArea autoSize={{ maxRows: 4, minRows: 4 }} />
        </Form.Item>
        <Form.Item label="最后更新时间">
          <Input
            disabled
            value={moment(data?.update_time).format('YYYY-MM-DD HH:mm:ss')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

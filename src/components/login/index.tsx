import { useEffect, useState } from 'react';
import { intl } from '@/locale';
import { Modal, Form, Input, Button, message } from 'antd';
import { login } from '@/api';
import styles from './index.less';

interface IProps {
  visible: boolean;
  onClose: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onLoginSuccess: (res: any) => void;
}

export default function Login(props: IProps) {
  const { visible, onClose, onLoginSuccess } = props;
  const [form] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const onLogin = () => {
    form
      .validateFields()
      .then((values) => {
        setLoginLoading(true);
        login(values)
          .then((res) => {
            onLoginSuccess(res);
          })
          .finally(() => {
            setLoginLoading(false);
          });
      })
      .catch(() => {
        message.error('请输入账号和密码！');
      });
  };
  useEffect(() => {
    if (!visible) {
      form && form.resetFields();
    }
  }, [form, visible]);
  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <div className={styles.container}>
        <Form form={form}>
          <Form.Item
            label={intl.get('account_number')}
            name="user"
            rules={[{ required: true, message: '' }]}
          >
            <Input allowClear autoComplete="off" />
          </Form.Item>
          <Form.Item
            label={intl.get('password')}
            name="pass"
            rules={[{ required: true, message: '' }]}
          >
            <Input.Password allowClear onPressEnter={onLogin} />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={onLogin} loading={loginLoading}>
          {intl.get('Sign_in')}
        </Button>
      </div>
    </Modal>
  );
}

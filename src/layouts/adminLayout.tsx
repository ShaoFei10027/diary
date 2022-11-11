import { useLayoutEffect, useState } from 'react';
import styles from './admin.less';
import { Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

interface ItemType {
  key: string;
  [propName: string]: any;
}

export default function AdminLayout() {
  const history = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const handleSelect = ({ key }: ItemType) => {
    history(`/admin/${key}`);
  };
  const handleClickSettings = () => {
    history('/admin/settings');
  };
  useLayoutEffect(() => {
    const { pathname } = location;
    const arr = pathname.split('/');
    if (arr.length === 2 || arr[2] === '') {
      setSelectedKeys(['info']);
    } else {
      setSelectedKeys([arr[2]]);
    }
  }, [location]);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu
          mode="vertical"
          onClick={handleSelect}
          selectedKeys={selectedKeys}
        >
          <Menu.Item key="questions">题库管理</Menu.Item>
          <Menu.Item key="products">内容创作</Menu.Item>
          <Menu.Item key="statistics">数据统计</Menu.Item>
          <Menu.Item key="resume">个人简历</Menu.Item>
        </Menu>
        <div
          onClick={handleClickSettings}
          className={`${styles.settings} ${
            selectedKeys[0] === 'settings' ? styles.selected : ''
          }`}
        >
          设置
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

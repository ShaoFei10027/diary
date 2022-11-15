import { useLayoutEffect, useState } from 'react';
import { intl } from '@/locale';
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
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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
      const k = arr.slice(2);
      setSelectedKeys([k.join('/')]);
      if (k.length > 1) {
        console.log(k, '============');
        setOpenKeys([k[0]]);
      } else {
        setOpenKeys([]);
      }
    }
  }, [location]);
  const menuItems = [
    {
      label: intl.get('Question_bank_management'),
      key: 'questions',
    },
    {
      label: intl.get('Content_Creation'),
      key: 'products',
    },
    {
      label: intl.get('data_statistics'),
      key: 'statistics',
    },
    {
      label: '国际化',
      key: 'translate',
      onTitleClick: () => handleSelect({ key: 'translate/list' }),
      children: [
        {
          label: '数据列表',
          key: 'translate/list',
        },
        {
          label: '数据处理与发布',
          key: 'translate/publish',
        },
        {
          label: '操作文档',
          key: 'translate/document',
        },
      ],
    },
    {
      label: intl.get('curriculum_vitae'),
      key: 'resume',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu
          mode="inline"
          onClick={handleSelect}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuItems}
        />
        <div
          onClick={handleClickSettings}
          className={`${styles.settings} ${
            selectedKeys[0] === 'settings' ? styles.selected : ''
          }`}
        >
          {intl.get('set_up')}
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

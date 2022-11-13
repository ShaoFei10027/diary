import React, { useState, useEffect, useMemo } from 'react';
import { intl } from '@/locale';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import Login from '@/components/login';
import { checkLogin, logout } from '@/api';
import { setLogin, setUserInfo } from '@/reducer/rootSlice';
import styles from './index.less';

const unchangedItems: any = [];
export default function Header() {
  const [visible, setVisible] = useState(false);
  const { isLogin, userInfo } = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleClick = (e: any) => {
    switch (e.key) {
      case 'login':
        setVisible(true);
        return;
      case 'logout':
        logout().then((res) => {
          if (res.success) {
            window.location.href = window.location.origin;
          }
        });
        return;
      case 'admin':
        history('/admin');
        return;
      case 'userInfo':
        history(`/user`);
        return;
      default:
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  const onLoginSuccess = (res: any) => {
    // FIXME 前后端统一类型res
    if (res.success) {
      message.success(intl.get('Login_succeeded'));
      dispatch(setLogin());
      dispatch(setUserInfo(res.data));
      setVisible(false);
    } else {
      message.error(intl.get('The_account_does_not_exist_or_the_password_is_incorrect'));
    }
  };
  const goHome = () => {
    history('/');
  };

  useEffect(() => {
    // 初始进入页面时查询登录状态
    checkLogin().then((res: any) => {
      // FIXME 前后端统一类型res
      if (res.success) {
        dispatch(setLogin());
        dispatch(setUserInfo(res.data));
      }
    });
  }, []);

  const items = useMemo(() => {
    if (isLogin) {
      return unchangedItems.concat([
        {
          label: userInfo.account,
          key: 'account',
          children: [
            {
              label: intl.get('Personal_Center'),
              key: 'userInfo',
            },

            {
              label: intl.get('Log_out'),
              key: 'logout',
            },
          ].concat(
            userInfo.role === 'admin'
              ? [
                  {
                    label: intl.get('Manage_background'),
                    key: 'admin',
                  },
                ]
              : []
          ),
        },
      ]);
    }
    return unchangedItems.concat([
      {
        label: intl.get('Sign_in'),
        key: 'login',
      },
    ]);
  }, [isLogin, userInfo.account, userInfo.role]);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.title}>
        <span style={{ cursor: 'pointer' }} onClick={goHome}>
          {intl.get('Front_end_knowledge_network')}
        </span>
      </div>
      <div className={styles.menu}>
        <Menu
          mode="horizontal"
          selectable={false}
          items={items}
          onClick={handleClick}
        />
      </div>
      <Login
        visible={visible}
        onClose={onClose}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
}

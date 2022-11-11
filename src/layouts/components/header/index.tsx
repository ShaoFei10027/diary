import React, { useState, useEffect, useMemo } from 'react';
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
      message.success('登录成功！');
      dispatch(setLogin());
      dispatch(setUserInfo(res.data));
      setVisible(false);
    } else {
      message.error('账号不存在或密码错误！');
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
              label: '个人中心',
              key: 'userInfo',
            },

            {
              label: '退出登录',
              key: 'logout',
            },
          ].concat(
            userInfo.role === 'admin'
              ? [
                  {
                    label: '管理后台',
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
        label: '登录',
        key: 'login',
      },
    ]);
  }, [isLogin, userInfo.account, userInfo.role]);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.title}>
        <span style={{ cursor: 'pointer' }} onClick={goHome}>
          前端知识网
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

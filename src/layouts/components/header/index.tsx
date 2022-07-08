import React from 'react'
import { Menu } from 'antd'
import styles from './index.less'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.title}>前端知识网</div>
      <div className={styles.menu}>
        <Menu mode="horizontal">
          <Menu.Item>登录</Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

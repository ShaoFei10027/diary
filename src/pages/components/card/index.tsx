import React from 'react';
import { Card } from 'antd';
import styles from './index.less';

interface IProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  [propName: string]: any;
}
export default function MyCard(props: IProps) {
  const { title, extra, children, ...rest } = props;
  return (
    <Card className={styles.card} title={title} extra={extra} {...rest}>
      {children}
    </Card>
  );
}

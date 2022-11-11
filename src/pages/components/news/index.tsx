import React, { useEffect, useState } from 'react';
import { intl } from '@/locale';
import { useNavigate } from 'react-router-dom';
import Card from '@/pages/components/card';
import { getNews } from '@/api';
import { NewsType } from '@/api/api.d';
import styles from './index.less';

export default function News() {
  const history = useNavigate();
  const [list, setList] = useState<NewsType[]>([]);
  useEffect(() => {
    getNews().then((res) => {
      if (res.success) {
        const { list } = res.data;
        setList(list);
      }
    });
  }, []);
  const onClick = (id: number) => history(`/articles/${id}`);
  return (
    <Card title={intl.get('Latest_articles')} extra={<a href="#">more</a>}>
      <div className={styles.cardBody}>
        {list.map((item) => (
          <p key={item.id} onClick={() => onClick(item.id)}>
            {item.title}
          </p>
        ))}
      </div>
    </Card>
  );
}

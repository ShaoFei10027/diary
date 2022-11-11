import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '@/api';
import { NewsType } from '@/api/api.d';
import styles from './index.less';

export default function Articles() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsType>();
  useLayoutEffect(() => {
    getArticle(Number(id)).then((res) => {
      if (res.success) {
        setArticle(res.data);
      }
    });
  }, []);
  return article ? (
    <div className={styles.page}>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.desc}>{article.description}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  ) : (
    <div>loading</div>
  );
}

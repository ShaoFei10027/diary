import React, { useState, useEffect } from 'react';
import { List, Input, Form, Button, message } from 'antd';
import Card from '@/pages/components/card';
import { getQuestions, saveQuestion, getQuestion } from '@/api';
import { QuestionType } from '@/api/api.d';
import styles from './index.less';

export default function Questions() {
  const [form] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState(false);
  const [modified, setModified] = useState(false);
  const [curId, setCurId] = useState<number>();
  // const [questionDetail, setQuestionDetail] = useState<QuestionType>();
  const [questionsList, setQuestionsList] = useState<QuestionType[]>([]);
  const [questionsTotal, setQuestionsTotal] = useState(0);

  const getQuestionsList = () => {
    getQuestions().then((res) => {
      if (res.success) {
        setQuestionsList(res.data.list);
        setQuestionsTotal(res.data.total);
      }
    });
  };
  const onSave = () => {
    form.validateFields().then((res) => {
      setSaveLoading(true);
      saveQuestion({
        ...res,
        id: curId,
      })
        .then((r) => {
          if (r.success) {
            message.success('保存成功');
            setModified(false);
            getQuestionsList();
          } else {
            message.error('保存失败');
          }
        })
        .catch((err) => {
          console.log('保存失败', err);
          message.error('保存失败');
        })
        .finally(() => {
          setSaveLoading(false);
        });
    });
  };
  const onListItemClick = (id?: number) => {
    if (id) {
      getQuestion(id).then((res) => {
        if (res.success) {
          const questionDetail: QuestionType = res.data;
          setCurId(id);
          setModified(false);
          form.setFieldsValue({
            question: questionDetail.question,
            explanation: questionDetail.explanation,
          });
        }
      });
    }
  };
  const onAdd = () => {
    setModified(false);
    setCurId(undefined);
    form.resetFields();
  };
  useEffect(() => {
    getQuestionsList();
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.questions}>
        <Card
          title="问题列表"
          extra={
            <Button type="link" onClick={onAdd}>
              新增
            </Button>
          }
        >
          <List
            size="small"
            className={styles.list}
            dataSource={questionsList}
            renderItem={(item: QuestionType) => (
              <List.Item onClick={() => onListItemClick(item.id)}>
                {item.question}
              </List.Item>
            )}
          />
        </Card>
      </div>
      <div className={styles.makeQuestion}>
        <Card
          title={curId ? `查看/编辑问题（#${curId}）` : '新增问题'}
          extra={
            <Button
              onClick={onSave}
              type="primary"
              size="small"
              loading={saveLoading}
              disabled={!modified}
            >
              保存
            </Button>
          }
        >
          <Form form={form}>
            <div className={styles.ask}>
              <p>问题描述</p>
              <Form.Item
                name="question"
                rules={[{ required: true, message: '问题描述是必填项' }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="问题描述"
                  onChange={() => setModified(true)}
                />
              </Form.Item>
            </div>
            <div className={styles.answer}>
              <p>答案解析</p>
              <Form.Item
                name="explanation"
                rules={[{ required: true, message: '答案解析是必填项' }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="答案解析"
                  onChange={() => setModified(true)}
                />
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

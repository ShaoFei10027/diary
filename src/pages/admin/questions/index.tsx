import React, { useState, useEffect } from 'react';
import { intl } from '@/locale';
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
            message.success(intl.get('Saving_succeeded'));
            setModified(false);
            getQuestionsList();
          } else {
            message.error(intl.get('Save_failed'));
          }
        })
        .catch((err) => {
          console.log(intl.get('Save_failed'), err);
          message.error(intl.get('Save_failed'));
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
          title={intl.get('Question_List')}
          extra={
            <Button type="link" onClick={onAdd}>
              {intl.get('newly_added')}
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
          title={
            curId
              ? `${intl.get('ViewEdit_Question')}（#${curId}）`
              : intl.get('New_problems')
          }
          extra={
            <Button
              onClick={onSave}
              type="primary"
              size="small"
              loading={saveLoading}
              disabled={!modified}
            >
              {intl.get('preservation')}
            </Button>
          }
        >
          <Form form={form}>
            <div className={styles.ask}>
              <p>{intl.get('Problem_description')}</p>
              <Form.Item
                name="question"
                rules={[
                  {
                    required: true,
                    message: intl.get('Problem_description_is_required'),
                  },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder={intl.get('Problem_description')}
                  onChange={() => setModified(true)}
                />
              </Form.Item>
            </div>
            <div className={styles.answer}>
              <p>{intl.get('Answer_analysis')}</p>
              <Form.Item
                name="explanation"
                rules={[
                  {
                    required: true,
                    message: intl.get('Answer_resolution_is_required'),
                  },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder={intl.get('Answer_analysis')}
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

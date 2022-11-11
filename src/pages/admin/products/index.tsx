import React, { useState } from 'react';
import { intl } from '@/locale';
import { Button, Form, Input, Select } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { publishArticle } from '@/api';

export default function Products() {
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onSave = () => {
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(text);
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  const onPublish = () => {
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    form.validateFields().then((values) => {
      publishArticle({
        title: values.title,
        desc: values.desc,
        auth: values.auth,
        content: text,
      }).then((res) => {
        console.log(res);
      });
    });
  };
  return (
    <div style={{ margin: 20 }}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="title" label={intl.get('title')}>
          <Input placeholder={intl.get('Please_enter_the_article_title')} />
        </Form.Item>
        <Form.Item name="desc" label={intl.get('brief_introduction')}>
          <Input placeholder={intl.get('Please_enter_the_article_introduction')} />
        </Form.Item>
        {/* 权限   2进制位[管理员，测试] */}
        <Form.Item initialValue={0} name="auth" label={intl.get('Set_access_rights')}>
          <Select>
            <Select.Option value={0}>{intl.get('open')}</Select.Option>
            <Select.Option value={1}>{intl.get('Test_only_visible')}</Select.Option>
            <Select.Option value={2}>{intl.get('Visible_only_to_administrators')}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={intl.get('text')}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorStyle={{
              minHeight: '500px',
              border: '1px solid #d9d9d9',
            }}
          />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button style={{ marginRight: 8 }} onClick={onSave}>
            {intl.get('Save_Draft_')}
          </Button>
          <Button type="primary" onClick={onPublish}>
            {intl.get('release')}
          </Button>
        </div>
      </Form>
    </div>
  );
}

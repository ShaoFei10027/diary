import React, { useState } from 'react';
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
        <Form.Item name="title" label="标题">
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item name="desc" label="简介">
          <Input placeholder="请输入文章简介" />
        </Form.Item>
        {/* 权限   2进制位[管理员，测试] */}
        <Form.Item initialValue={0} name="auth" label="设置访问权限">
          <Select>
            <Select.Option value={0}>公开</Select.Option>
            <Select.Option value={1}>仅测试可见</Select.Option>
            <Select.Option value={2}>仅管理员可见</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="正文">
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
            保存草稿
          </Button>
          <Button type="primary" onClick={onPublish}>
            发布
          </Button>
        </div>
      </Form>
    </div>
  );
}

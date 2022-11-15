import React from 'react';
import Background from './components/Background';
import Card from './components/Card';
import Experience from './components/Experience';
import Download from '@/components/download';
import styles from './index.less';

export default function Resume() {
  return (
    <div>
      <Background className={styles.background} />
      <div className={styles.document}>
        <div className={styles.left}>
          <Card title="个人信息">
            <ul className={styles.list}>
              <li>姓名：邵飞</li>
              <li>电话：18507188965</li>
              <li>邮箱：503148647@qq.com</li>
              <li>工作经验：5年</li>
              <li>民族：汉</li>
              <li>现住：湖北武汉</li>
              <li>性别：男</li>
              <li>年龄：29</li>
            </ul>
          </Card>
          <Card title="教育经历">
            <ul className={styles.list}>
              <li>2012.09 至 2016.06</li>
              <li>华中科技大学</li>
              <li>计算机科学与技术</li>
              <li>全日制统招本科</li>
            </ul>
          </Card>
          <Card title="工作经历">
            <ul className={styles.orderList}>
              <li>
                <strong>武汉波士顿比邻科技有限公司</strong> 2017.03 - 2018.12
                前端开发工程师（部门裁员）
              </li>
              <li>
                <strong>南斗六星系统集成有限公司</strong> 2019.02 - 2019.12
                前端开发工程师（个人发展）
              </li>
              <li>
                <strong>浩鲸智能科技有限公司</strong> 2020.07 - 2022.08
                前端开发工程师（部门裁员）
              </li>
            </ul>
          </Card>
          <Card title="项目经历">
            <Experience
              time="2021.01 --- 2022.01"
              addr="云效codeup企业级代码管理平台"
            >
              <div>
                <strong>项目描述：</strong>
                基于 Git
                的代码管理平台，服务于企业，提供代码托管、代码评审、代码扫描、质量检测、持续集成等功能。
              </div>
              <div>
                <strong>负责内容：</strong>
                参与新功能prd评审、ued评审，使用react相关技术，独立负责页面开发与优化、持续修复页面缺陷，为企业定制专有云版本。负责相关产品宣传页H5开发，负责codeup日常版本迭代、功能上新，参与云效公共组件开发，完成codeup整体页面UI重构及性能优化。
              </div>
            </Experience>
            <Experience
              time="2022.01 --- 2022.05"
              addr="阿里云大学租户管理平台"
            >
              <div>
                <strong>项目描述：</strong>
                后台权限管理项目，提供数据统计与权限管理
              </div>
              <div>
                <strong>负责内容：</strong>
                项目搭建，请求方法封装，路由与导航设计，使用react相关技术完成租户管理页面开发、使用g2图表条形图与饼状图展现租户数据统计，参与相关产品chrome插件开发
              </div>
            </Experience>
            <Experience time="2022.05 --- 2022.08" addr="数字云栖项目">
              <div>
                <strong>项目描述：</strong>
                为阿里2022云栖大会提供的一套管理平台，包含门票、参展商、客户、峰会数据和权限的管理。
              </div>
              <div>
                <strong>负责内容：</strong>
                使用react相关技术完成展商管理模块开发、权限控制、及联调
              </div>
            </Experience>
          </Card>
        </div>
        <div className={styles.right}>
          <Card title="个人技能">
            <ul className={styles.orderList}>
              <li>熟悉ES5、ES6，熟悉基本数据结构与算法。</li>
              <li>熟悉umi、dva框架，熟练使用antd组件库。</li>
              <li>熟练使用React，读过React17源码，了解其原理。</li>
              <li>熟练使用typescript约束变量类型。</li>
              <li>熟练使用eharts、g2图表库。</li>
              <li>了解webpack基本配置，解决常规打包问题。</li>
              <li>了解nodejs，能编写简单脚本解决问题。</li>
              <li>
                了解koa、express、mysql、React-Native、Electron、Vue、微信小程序。
              </li>
            </ul>
          </Card>
          <Card title="附件">
            <ul className={styles.orderList}>
              <li>
                <Download
                  name="前端工程师-邵飞.doc"
                  url="http://localhost:9000/api/download/resume"
                />
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

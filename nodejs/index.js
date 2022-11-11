const fs = require('fs');
const path = require('path');
const request = require('request');
const fileDisplay = require('./fileDisplay');
const getLocaleCode = require('./getLocaleCode');

const filePath = path.resolve('src/');
const transArray = [];
fileDisplay(filePath, (filepath) => {
  const regexp = /\.(t|j)sx?$/;
  if (
    regexp.test(filepath) &&
    !/\.d\.ts$/.test(filepath) &&
    !/(\\resume\\)|(\\statistics\\)|(\\locale\\)/.test(filepath)
  ) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log('读取文件内容失败！');
      } else {
        let transData = getLocaleCode(data);
        transArray.push(...transData);
      }
    });
  }
});

setTimeout(() => {
  const data = Array.from(new Set(transArray)).join('\n');
  request(
    `http://localhost:9000/api/translate?q=${encodeURIComponent(data)}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        console.log(err);
      } else if (body.success) {
        const jsonArr = body.data;
        const zn_ch = [];
        const en_us = [];
        jsonArr.forEach((item) => {
          zn_ch.push({
            [item.dst.replace(/ /g, '_')]: item.src,
          });
          en_us.push({
            [item.dst.replace(/ /g, '_')]: item.dst,
          });
        });
        fs.writeFile(
          path.resolve('src/locale/zn_ch.ts'),
          `export default ${JSON.stringify(zn_ch)}`,
          'utf-8',
          (err2) => {
            if (err2) {
              console.log('写入失败');
            } else {
              console.log('finish znch');
            }
          }
        );
        fs.writeFile(
          path.resolve('src/locale/en_us.ts'),
          `export default ${JSON.stringify(en_us)}`,
          'utf-8',
          (err2) => {
            if (err2) {
              console.log('写入失败');
            } else {
              console.log('finish enus');
            }
          }
        );
      }
    }
  );
}, 4000);

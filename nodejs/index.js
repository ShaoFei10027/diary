const fs = require('fs');
const path = require('path');
const request = require('request');
const fileDisplay = require('./fileDisplay');
const getLocaleCode = require('./getLocaleCode');

const filePath = path.resolve('src/');
const transArray = [];

// console.log('run');
// request(
//   `http://localhost:9000/api/releaseTranslateFile`,
//   { json: true },
//   (err, res, body) => {
//     // 这里其实并不需要返回翻译结果，后端直接生成翻译的文件即可
//     if (err) {
//       console.log(err);
//     } else if (body.success) {
//       console.log(body.data);
//     }
//   }
// );

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
  // data是需要翻译的内容数组
  request(
    `http://localhost:9000/api/translate?q=${encodeURIComponent(data)}`,
    { json: true },
    (err, res, body) => {
      // 这里其实并不需要返回翻译结果，后端直接生成翻译的文件即可
      if (err) {
        console.log(err);
      } else if (body.success) {
        console.log(body.data);
      }
    }
  );
}, 4000);

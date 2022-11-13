const fs = require('fs');
const path = require('path');
const request = require('request');
const fileDisplay = require('./fileDisplay');
const getLocaleCode = require('./getLocaleCode');

const filePath = path.resolve('src/');

request(
  `http://localhost:9000/locale.json`,
  { json: true },
  (err, res, body) => {
    if (!err) {
      const jsonData = body;
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
              let newContent = getLocaleCode(data, jsonData);
              fs.writeFile(filepath, newContent, 'utf-8', (err2) => {
                if (err2) {
                  console.log('写入失败');
                } else {
                  console.log(filepath, 'update');
                }
              });
            }
          });
        }
      });
    }
  }
);

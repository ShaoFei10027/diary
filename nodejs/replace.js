const fs = require('fs');
const path = require('path');
const fileDisplay = require('./fileDisplay');
const getLocaleCode = require('./getLocaleCode');

const filePath = path.resolve('src/');

const znchStr = fs.readFileSync(path.resolve('src/locale/zn_ch.ts'), 'utf-8');
const znch = JSON.parse(znchStr.replace(/^export default /, ''));


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
        let newContent = getLocaleCode(data, znch);
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

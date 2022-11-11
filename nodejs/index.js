const fs = require('fs');
const path = require('path');
const fileDisplay = require('./fileDisplay')

const filePath = path.resolve('src/');
fileDisplay(filePath, (filepath) => {
  const regexp = /\.(t|j)sx?$/
  if (regexp.test(filepath)) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log('读取文件内容失败！')
      } else {
        let newContent = data;
        fs.writeFile(filepath, newContent, 'utf-8', err2 => {
          if (err2) {
            console.log('写入失败')
          }
        })
      }
    })
  }
})

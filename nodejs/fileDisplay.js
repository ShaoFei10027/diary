const fs = require('fs');
const path = require('path');

function fileDisplay(filePath, fileCallback) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      return console('文件读取错误！');
    } else {
      files.forEach((filename) => {
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, (error, stats) => {
          if (error) {
            console.log('获取文件stats失败！');
          } else {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if (isFile) {
              fileCallback(filedir);
            } else {
              fileDisplay(filedir, fileCallback);
            }
          }
        });
      });
    }
  });
}

module.exports = fileDisplay;

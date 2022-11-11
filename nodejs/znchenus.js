const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve('src/locale/translate.js'), 'utf-8', (err, data) => {
  console.log(data);
  const json = JSON.stringify(data.replace(/\r\n/g, ''));
  console.log(json);
});

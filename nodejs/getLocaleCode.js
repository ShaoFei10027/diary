import znch from '../src/locale/zn_ch';

function getLocaleCode(str, fileReplace) {
  if (fileReplace) {
    const res = str.split('\r\n').map((line) => {
      let rp = line;
      if (/[\u4e00-\u9fa5]+/.test(line)) {
        const newlineArr = line.match(/[\u4e00-\u9fa5]+/g);
        newlineArr.forEach((item) => {
          const enTitleObj = znch.find((v) => Object.values(v)[0] === item);
          if (enTitleObj) {
            rp = line.replace(item, Object.keys(enTitleObj)[0]);
          }
        });
      }
      return rp;
    });
    return res.join('\r\n');
  }
  const data = [];
  str.split('\r\n').forEach((line) => {
    if (/[\u4e00-\u9fa5]+/.test(line)) {
      const newlineArr = line.match(/[\u4e00-\u9fa5]+/g);
      data.push(...newlineArr);
    }
  });
  return data;
}

module.exports = getLocaleCode;

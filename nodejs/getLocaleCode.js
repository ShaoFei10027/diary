function getLocaleCode(str) {
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

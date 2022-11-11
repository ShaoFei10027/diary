function getLocaleCode(str, znch) {
  if (znch) {
    let hasReplaceFlag = false;
    const res = str.split('\r\n').map((line) => {
      let rp = line;
      if (
        /[\u4e00-\u9fa5]+/.test(line) &&
        !/^[ ]*\/\//.test(line) &&
        !/^[ ]*\{\/\*/.test(line)
      ) {
        const newlineArr = line.match(/[\u4e00-\u9fa5]+/g);
        newlineArr.forEach((item) => {
          const enTitleObj = znch.find((v) => Object.values(v)[0] === item);
          if (enTitleObj) {
            hasReplaceFlag = true;
            if (/(const)|(let)/.test(line) && /[=]/.test(line)) {
              rp = line.replace(
                `"${item}"`,
                `intl.get('${Object.keys(enTitleObj)[0]}')`
              );
            } else if (/[\(\)]/.test(line)) {
              rp = line.replace(
                `'${item}'`,
                `intl.get('${Object.keys(enTitleObj)[0]}')`
              );
            } else {
              rp = line
                .replace(
                  `"${item}"`,
                  `{intl.get('${Object.keys(enTitleObj)[0]}')}`
                )
                .replace(
                  `'${item}'`,
                  `{intl.get('${Object.keys(enTitleObj)[0]}')}`
                )
                .replace(
                  `${item}`,
                  `{intl.get('${Object.keys(enTitleObj)[0]}')}`
                );
            }
          }
        });
      }
      return rp;
    });
    if (hasReplaceFlag) {
      res[0] += "\r\nimport { intl } from '@/locale';";
    }
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

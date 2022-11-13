function findTranslateObj(replaceText, znch) {
  const ukeyObj = znch.find((v) => v.chinese === replaceText);
  return ukeyObj;
}

function getLocaleCode(str, znch) {
  if (znch) {
    let hasReplaceFlag = false;
    const hasImport = /['"]@\/locale['"]/.test(str) && /intl/.test(str);
    const res = str.split('\r\n').map((line) => {
      let rp = line;
      if (
        /[\u4e00-\u9fa5]+/.test(line) &&
        !/^[ ]*\/\//.test(line) &&
        !/^[ ]*\{\/\*/.test(line)
      ) {
        if (/'.*?[\u4e00-\u9fa5]+.*?'/.test(rp)) {
          // 如果是引号内的中文，则全内容翻译
          const textArr = rp
            .match(/'.*?[\u4e00-\u9fa5]+.*?'/g)
            .map((i) => i.replace(/(^')|('$)/g, ''));
          // 要被替换的就是textArr
          textArr.forEach((item) => {
            const uKeyObj = findTranslateObj(item, znch);
            if (uKeyObj) {
              if (/(const)|(let)/.test(line) && /[=]/.test(line)) {
                rp = line.replace(`'${item}'`, `intl.get('${uKeyObj.ukey}')`);
              } else if (/[\(\)]/.test(line)) {
                rp = line.replace(
                  `('${item}')`,
                  `(intl.get('${uKeyObj.ukey}'))`
                );
              } else if (/[:]/.test(line)) {
                rp = line.replace(`'${item}'`, `intl.get('${uKeyObj.ukey}')`);
              } else {
                rp = line.replace(`'${item}'`, `{intl.get('${uKeyObj.ukey}')}`);
              }
            }
          });
        }
        if (/".*?[\u4e00-\u9fa5]+.*?"/.test(rp)) {
          // 如果是引号内的中文，则全内容翻译
          const textArr = rp
            .match(/".*?[\u4e00-\u9fa5]+.*?"/g)
            .map((i) => i.replace(/(^")|("$)/g, ''));
          // 要被替换的就是textArr
          textArr.forEach((item) => {
            const uKeyObj = findTranslateObj(item, znch);
            if (uKeyObj) {
              if (/(const)|(let)/.test(rp) && /[=]/.test(rp)) {
                rp = rp.replace(`"${item}"`, `intl.get('${uKeyObj.ukey}')`);
              } else if (/[\(\)]/.test(rp)) {
                rp = rp.replace(`("${item}")`, `(intl.get('${uKeyObj.ukey}'))`);
              } else if (/[:]/.test(rp)) {
                rp = rp.replace(`"${item}"`, `intl.get('${uKeyObj.ukey}')`);
              } else {
                rp = rp.replace(`"${item}"`, `{intl.get('${uKeyObj.ukey}')}`);
              }
            }
          });
        }
        if (/>.*?[\u4e00-\u9fa5]+.*?<\//.test(rp)) {
          // 如果是标签内的中文，则全内容翻译
          const textArr = rp
            .match(/>.*?[\u4e00-\u9fa5]+.*?<\//g)
            .map((i) => i.replace(/(^>)|(<\/$)/g, ''));
          textArr.forEach((item) => {
            const uKeyObj = findTranslateObj(item, znch);
            if (uKeyObj) {
              rp = rp.replace(`${item}`, `{intl.get('${uKeyObj.ukey}')}`);
            }
          });
        }
        if (/[\u4e00-\u9fa5]+/.test(rp)) {
          const text = rp.replace(/(^\s*)|(\s*$)/g, '');
          const uKeyObj = findTranslateObj(text, znch);
          rp = rp.replace(`${text}`, `{intl.get('${uKeyObj.ukey}')}`);
        }
      }
      return rp;
    });
    if (!hasImport && hasReplaceFlag) {
      res[0] += "\r\nimport { intl } from '@/locale';";
    }
    return res.join('\r\n');
  }
  const data = [];
  str.split('\r\n').forEach((line) => {
    if (
      /[\u4e00-\u9fa5]+/.test(line) &&
      !/^[ ]*\/\//.test(line) &&
      !/^[ ]*\{\/\*/.test(line)
    ) {
      // 存在中文并且不是注释
      let rp = line;
      const transArr = [];
      if (/'.*?[\u4e00-\u9fa5]+.*?'/.test(rp)) {
        // 如果是引号内的中文，则全内容翻译
        const textArr = rp
          .match(/'.*?[\u4e00-\u9fa5]+.*?'/g)
          .map((i) => i.replace(/'/g, ''));
        transArr.push(...textArr);
        rp = rp.replace(/'.*?[\u4e00-\u9fa5]+.*?'/g, '');
      }
      if (/".*?[\u4e00-\u9fa5]+.*?"/.test(rp)) {
        // 如果是引号内的中文，则全内容翻译
        const textArr = rp
          .match(/".*?[\u4e00-\u9fa5]+.*?"/g)
          .map((i) => i.replace(/"/g, ''));
        transArr.push(...textArr);
        rp = rp.replace(/".*?[\u4e00-\u9fa5]+.*?"/g, '');
      }
      if (/>.*?[\u4e00-\u9fa5]+.*?<\//.test(rp)) {
        // 如果是标签内的中文，则全内容翻译
        const textArr = rp
          .match(/>.*?[\u4e00-\u9fa5]+.*?<\//g)
          .map((i) => i.replace(/(^>)|(<\/$)/g, ''));
        transArr.push(...textArr);
        rp = rp.replace(/>.*?[\u4e00-\u9fa5]+.*?<\//g, '');
      }
      if (/[\u4e00-\u9fa5]+/.test(rp)) {
        // 如果经过上面操作之后还有中文，说明是单独行中文，则全行翻译，这里的rp一般是等于line的
        transArr.push(rp.replace(/(^\s*)|(\s*$)/g, ''));
      }

      data.push(...transArr);
    }
  });
  return data;
}

module.exports = getLocaleCode;

const locale = window.locale_json || {};

const getZ = (str) => {
  return locale[str] && locale[str].cn;
};

const getE = (str) => {
  return locale[str] && locale[str].en;
};

const getTranslate = (str) => {
  const lang = localStorage.getItem('lang');
  if (lang === 'en_US') {
    return getE(str) || str;
  }
  return getZ(str) || str;
};

const getChangeLang = () => {
  const lang = localStorage.getItem('lang');
  if (lang === 'en_US') {
    return '中';
  }
  return 'En';
};

const changeLang = () => {
  const lang = localStorage.getItem('lang');
  if (lang === 'en_US') {
    localStorage.setItem('lang', 'zh_CN');
  } else {
    localStorage.setItem('lang', 'en_US');
  }
  window.location.reload();
};

export const intl = {
  get: getTranslate,
  getChangeLang,
  changeLang,
};

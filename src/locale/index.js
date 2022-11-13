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

export const intl = {
  get: getTranslate,
};

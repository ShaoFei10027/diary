import znch from './zn_ch';
import enus from './en_us';

const getZ = (str) => {
  const res = znch.find((item) => !!item[str]);
  return res[str] || str;
};

const getE = (str) => {
  const res = znch.find((item) => !!item[str]);
  return res[str] || str;
};

const getTranslate = (str) => {
  const config = window.config;
  if (config.lang === 'en_US') {
    return getE(str);
  }
  return getZ(str);
};

export const intl = {
  get: getTranslate,
};

import { message } from 'antd';
import { intl } from '@/locale';
interface ParamsType {
  [propsName: string]: any;
}
//get请求封装
export const get = function (url: string, params: ParamsType = {}) {
  let list = [];
  for (let key in params) {
    let str = `${key}=${params[key]}`;
    list.push(str);
  }
  const data = list.join('&');
  let allUrl = data ? `${url}?${data}` : url;
  // debugger
  return fetch(allUrl, { credentials: 'include' })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      message.error(intl.get('request_timeout'));
      throw new Error(err);
    });
};
// post请求封装
export const post = function (url: string, params: ParamsType = {}) {
  const requestConfig = {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'force-cache',
    body: JSON.stringify(params),
  };
  // @ts-ignore
  return fetch(url, requestConfig)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      message.error(intl.get('request_timeout'));
      throw new Error(err);
    });
};

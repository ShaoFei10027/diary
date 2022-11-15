import { get as fetchGet, post as fetchPost } from './fetch';
import { QuestionType } from './api.d';
interface ParamsType {
  [propsName: string]: any;
}
const baseUrl = 'http://localhost:9000';
const get = (url: string, params?: ParamsType) =>
  fetchGet(baseUrl + url, params);
const post = (url: string, params?: ParamsType) =>
  fetchPost(baseUrl + url, params);

export const login = (params: any) => post('/api/login', params);
export const checkLogin = () => get('/api/login');
export const logout = () => post('/api/logout');
export const getUser = () => get('/api/user');

export const getNews = () => get('/api/articles');
export const getArticle = (id: number) => get(`/api/article/${id}`);
export const publishArticle = (params: any) => post('/api/article', params);

export const getQuestions = () => get('/api/questions');
export const getQuestion = (id: number) => get(`/api/question/${id}`);
export const saveQuestion = (params: QuestionType) =>
  post('/api/question', params);

export const getTranslateData = (params: any) =>
  get('/api/getTranslateData', params);
export const updateTransDate = (params: any) =>
  post('/api/updateTransDate', params);
export const getDulpTranslateData = () => get('/api/getDulpTranslateData');

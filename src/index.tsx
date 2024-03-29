import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import './index.css';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './layouts';
// import reportWebVitals from './reportWebVitals'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

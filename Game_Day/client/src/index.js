import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://cdn.ayroui.com/1.0/css/bootstrap.min.css" />
    {/* <!--====== Lineicons CSS ======--> */}
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />

    {/* <!--====== Style css ======--> */}
    <link rel="stylesheet" href="https://cdn.ayroui.com/1.0/css/starter.css" />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

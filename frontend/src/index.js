import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {x_store} from "./redux/x_store";

const root = ReactDOM.createRoot(document.getElementById('root'));
const url = `http://localhost:8081/auth/realms/alumni/protocol/openid-connect/auth?response_type=token&client_id=alumni&redirect_uri=http://localhost:3000/callback`
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('access_token')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
        window.location.assign(url);
    }
    return Promise.reject(error);
});

root.render(
  <React.StrictMode>
    <Provider store={x_store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
